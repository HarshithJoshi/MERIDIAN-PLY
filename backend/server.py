from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Any, Dict, List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup (optional)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', '').strip()

try:
    import resend  # type: ignore
    if RESEND_API_KEY:
        resend.api_key = RESEND_API_KEY
except Exception:
    resend = None

app = FastAPI(title="Meridian Plywood API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ===================== Models =====================
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    company: Optional[str] = Field(default=None, max_length=160)
    role: Optional[str] = Field(default=None, max_length=80)  # Architect, Builder, Designer, Dealer
    project_type: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=1, max_length=4000)


class Inquiry(InquiryCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kind: str = "inquiry"  # inquiry | dealer | sample
    created_at: str = Field(default_factory=now_iso)


class DealerCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=4, max_length=40)
    company: str = Field(min_length=1, max_length=160)
    city: str = Field(min_length=1, max_length=120)
    state: Optional[str] = Field(default=None, max_length=80)
    years_in_business: Optional[int] = Field(default=None, ge=0, le=200)
    message: Optional[str] = Field(default=None, max_length=2000)


class SampleRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=4, max_length=40)
    address: str = Field(min_length=1, max_length=400)
    products: List[str] = Field(default_factory=list)
    notes: Optional[str] = Field(default=None, max_length=2000)


# ===================== Helpers =====================
async def send_email_async(to_email: str, subject: str, html: str) -> bool:
    if not (RESEND_API_KEY and resend):
        logger.info(f"[EMAIL DISABLED] would send to {to_email}: {subject}")
        return False
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [to_email],
            "subject": subject,
            "html": html,
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Resend send error: {e}")
        return False


def render_admin_email(kind: str, data: Dict[str, Any]) -> str:
    rows = "".join(
        f"<tr><td style='padding:8px 14px;border-bottom:1px solid #1f1f1f;color:#A3A3A3;font-family:Helvetica,Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:0.08em'>{k}</td>"
        f"<td style='padding:8px 14px;border-bottom:1px solid #1f1f1f;color:#F6F1E9;font-family:Helvetica,Arial,sans-serif;font-size:14px'>{v}</td></tr>"
        for k, v in data.items() if v not in (None, "", [])
    )
    return f"""
    <div style="background:#0B0B0B;padding:32px;font-family:Helvetica,Arial,sans-serif">
      <table style="max-width:620px;margin:0 auto;background:#141414;border:1px solid #1f1f1f;border-radius:14px;overflow:hidden">
        <tr><td style="padding:24px 28px;border-bottom:1px solid #1f1f1f">
          <div style="color:#B87333;font-size:11px;letter-spacing:0.35em;text-transform:uppercase">Meridian Plywood</div>
          <div style="color:#F6F1E9;font-size:22px;margin-top:8px">New {kind.title()}</div>
        </td></tr>
        <tr><td><table style="width:100%">{rows}</table></td></tr>
        <tr><td style="padding:18px 28px;color:#6c6c6c;font-size:12px">Built to Endure. Designed to Inspire.</td></tr>
      </table>
    </div>
    """


def render_user_ack_email(name: str, kind: str) -> str:
    return f"""
    <div style="background:#0B0B0B;padding:32px;font-family:Helvetica,Arial,sans-serif">
      <table style="max-width:620px;margin:0 auto;background:#141414;border:1px solid #1f1f1f;border-radius:14px;overflow:hidden">
        <tr><td style="padding:32px">
          <div style="color:#B87333;font-size:11px;letter-spacing:0.35em;text-transform:uppercase">Meridian Plywood</div>
          <h1 style="color:#F6F1E9;font-weight:600;font-size:26px;margin:14px 0 12px">Thank you, {name}.</h1>
          <p style="color:#A3A3A3;font-size:15px;line-height:1.7">
            We've received your {kind}. A member of our specifications team will respond within one business day.
          </p>
          <p style="color:#A3A3A3;font-size:15px;line-height:1.7;margin-top:18px">
            In the meantime, explore our technical catalogue at the link in your initial form.
          </p>
          <div style="margin-top:28px;color:#6A442B;font-size:14px;letter-spacing:0.18em;text-transform:uppercase">— The Meridian Team</div>
        </td></tr>
      </table>
    </div>
    """


# ===================== Routes =====================
@api_router.get("/")
async def root():
    return {"service": "Meridian Plywood API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"ok": True, "ts": now_iso(), "email_enabled": bool(RESEND_API_KEY)}


# ---- Inquiry ----
@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    obj = Inquiry(**payload.model_dump(), kind="inquiry")
    await db.inquiries.insert_one(obj.model_dump())
    # Fire-and-forget emails
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL or obj.email,
        f"New Inquiry — {obj.name}",
        render_admin_email("inquiry", obj.model_dump()),
    ))
    asyncio.create_task(send_email_async(
        obj.email,
        "We've received your inquiry — Meridian Plywood",
        render_user_ack_email(obj.name, "inquiry"),
    ))
    return obj


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(limit: int = 100):
    docs = await db.inquiries.find({"kind": "inquiry"}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ---- Dealer ----
@api_router.post("/dealers")
async def create_dealer(payload: DealerCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "kind": "dealer",
        "created_at": now_iso(),
        **payload.model_dump(),
    }
    await db.inquiries.insert_one(doc)
    doc.pop("_id", None)
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL or payload.email,
        f"New Dealer Registration — {payload.company}",
        render_admin_email("dealer registration", doc),
    ))
    asyncio.create_task(send_email_async(
        payload.email,
        "Dealer Registration Received — Meridian Plywood",
        render_user_ack_email(payload.name, "dealer registration"),
    ))
    return doc


@api_router.get("/dealers")
async def list_dealers(limit: int = 100):
    docs = await db.inquiries.find({"kind": "dealer"}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ---- Sample Requests ----
@api_router.post("/samples")
async def create_sample(payload: SampleRequestCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "kind": "sample",
        "created_at": now_iso(),
        **payload.model_dump(),
    }
    await db.inquiries.insert_one(doc)
    doc.pop("_id", None)
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL or payload.email,
        f"New Sample Request — {payload.name}",
        render_admin_email("sample request", doc),
    ))
    asyncio.create_task(send_email_async(
        payload.email,
        "Sample Request Received — Meridian Plywood",
        render_user_ack_email(payload.name, "sample request"),
    ))
    return doc


@api_router.get("/samples")
async def list_samples(limit: int = 100):
    docs = await db.inquiries.find({"kind": "sample"}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# ---- Products (static catalog) ----
PRODUCT_CATALOG = [
    {
        "slug": "bwp-gurjan",
        "name": "BWP Gurjan Plywood",
        "category": "Plywood",
        "description": "100% Gurjan hardwood core with boiling waterproof bonding. The flagship.",
        "thickness": ["6mm", "9mm", "12mm", "16mm", "19mm", "25mm"],
        "grade": "IS 710",
        "water_resistance": "Boiling Waterproof",
        "warranty": "Lifetime",
        "applications": ["Modular kitchens", "Wardrobes", "Wet areas", "Heavy furniture"],
    },
    {
        "slug": "marine-grade",
        "name": "Marine Plywood",
        "category": "Plywood",
        "description": "Engineered for prolonged submersion. Yacht-grade adhesion.",
        "thickness": ["9mm", "12mm", "19mm", "25mm"],
        "grade": "IS 710 Marine",
        "water_resistance": "Marine",
        "warranty": "30 Years",
        "applications": ["Marine craft", "Outdoor cabinetry", "Bathrooms"],
    },
    {
        "slug": "block-board",
        "name": "Gurjan Block Board",
        "category": "Boards",
        "description": "Solid hardwood batten core sandwiched between Gurjan veneers.",
        "thickness": ["19mm", "25mm"],
        "grade": "IS 1659",
        "water_resistance": "BWR",
        "warranty": "25 Years",
        "applications": ["Doors", "Shelves", "Long spans"],
    },
    {
        "slug": "decorative-veneer",
        "name": "Decorative Veneers",
        "category": "Surfaces",
        "description": "Hand-selected natural veneers in walnut, oak and teak.",
        "thickness": ["4mm"],
        "grade": "Architectural",
        "water_resistance": "MR",
        "warranty": "10 Years",
        "applications": ["Feature walls", "Furniture facades"],
    },
    {
        "slug": "laminates",
        "name": "Premium Laminates",
        "category": "Surfaces",
        "description": "High-pressure laminates with matte, textured and metallic finishes.",
        "thickness": ["0.8mm", "1.0mm", "1.25mm"],
        "grade": "EN 438",
        "water_resistance": "Water-resistant",
        "warranty": "15 Years",
        "applications": ["Cabinetry", "Doors", "Wall panels"],
    },
    {
        "slug": "mdf-hdf",
        "name": "MDF & HDF Panels",
        "category": "Panels",
        "description": "Engineered density panels for precision routing and finishing.",
        "thickness": ["6mm", "9mm", "12mm", "18mm"],
        "grade": "E1",
        "water_resistance": "MR / BWR",
        "warranty": "10 Years",
        "applications": ["Routed panels", "Lacquered fronts", "Acoustic"],
    },
]


@api_router.get("/products")
async def list_products() -> Dict[str, List[Dict[str, Any]]]:
    return {"products": PRODUCT_CATALOG}


# ===================== App Setup =====================
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
