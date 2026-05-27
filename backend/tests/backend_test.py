"""
Meridian Plywood — Backend API tests
Covers: health, products catalog, inquiries, dealers, samples CRUD-lite,
and validation behavior. Email integration must gracefully degrade
when RESEND_API_KEY is empty (no 500s on create endpoints).
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fall back to reading frontend .env for the public URL
    try:
        with open("/app/frontend/.env", "r") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().strip('"')
                    break
    except FileNotFoundError:
        pass

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --------- Health ---------
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert "email_enabled" in data
        assert isinstance(data["email_enabled"], bool)
        # RESEND_API_KEY is empty in .env -> must be False
        assert data["email_enabled"] is False, (
            f"Expected email_enabled to be False when RESEND_API_KEY is empty, got {data}"
        )

    def test_root(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert body.get("status") == "ok"


# --------- Products ---------
class TestProducts:
    def test_products_returns_six(self, client):
        r = client.get(f"{API}/products", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "products" in data
        assert isinstance(data["products"], list)
        assert len(data["products"]) == 6, f"Expected 6 products, got {len(data['products'])}"
        # Validate structure of first product
        p = data["products"][0]
        for key in ["slug", "name", "category", "description", "thickness",
                    "grade", "water_resistance", "warranty", "applications"]:
            assert key in p, f"Missing field {key} in product"
        # Spot check for BWP Gurjan flagship
        slugs = [p["slug"] for p in data["products"]]
        assert "bwp-gurjan" in slugs
        assert "marine-grade" in slugs


# --------- Inquiries ---------
class TestInquiries:
    def test_create_inquiry_valid(self, client):
        payload = {
            "name": "TEST_Aarav Mehta",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+91 9876543210",
            "company": "TEST_Studio Mehta",
            "role": "Architect",
            "project_type": "Residential",
            "message": "Requesting specs for BWP Gurjan in kitchen modules.",
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        # Validate response shape
        assert body["kind"] == "inquiry"
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["message"] == payload["message"]
        assert isinstance(body["id"], str) and len(body["id"]) > 10
        assert "created_at" in body
        # Stash id for persistence check
        pytest.created_inquiry = body

    def test_inquiry_persisted_in_list(self, client):
        created = getattr(pytest, "created_inquiry", None)
        assert created, "Previous test must have created an inquiry"
        r = client.get(f"{API}/inquiries", timeout=15)
        assert r.status_code == 200, r.text
        items = r.json()
        assert isinstance(items, list)
        ids = [it.get("id") for it in items]
        assert created["id"] in ids, "Newly created inquiry not present in GET /api/inquiries"
        # Ensure no Mongo _id leaks
        for it in items:
            assert "_id" not in it

    def test_create_inquiry_minimal_required(self, client):
        payload = {
            "name": "TEST_Min Req",
            "email": f"min_{uuid.uuid4().hex[:6]}@example.com",
            "message": "Minimum required only.",
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["kind"] == "inquiry"
        assert body.get("phone") is None

    def test_create_inquiry_invalid_email_422(self, client):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "message": "Should fail validation",
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422, f"Expected 422 got {r.status_code}: {r.text}"

    def test_create_inquiry_missing_message_422(self, client):
        payload = {
            "name": "TEST_NoMsg",
            "email": "x@example.com",
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422

    def test_get_inquiries_filters_kind(self, client):
        r = client.get(f"{API}/inquiries", timeout=15)
        assert r.status_code == 200
        for it in r.json():
            assert it.get("kind") == "inquiry"


# --------- Dealers ---------
class TestDealers:
    def test_create_dealer_valid(self, client):
        payload = {
            "name": "TEST_Dealer Rao",
            "email": f"dealer_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+91 9999000011",
            "company": "TEST_Rao Timbers",
            "city": "Bengaluru",
            "state": "Karnataka",
            "years_in_business": 12,
            "message": "Interested in distributing BWP Gurjan in South India.",
        }
        r = client.post(f"{API}/dealers", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["kind"] == "dealer"
        assert body["company"] == payload["company"]
        assert body["city"] == payload["city"]
        assert isinstance(body["id"], str)
        pytest.created_dealer = body

    def test_dealer_persisted_in_list(self, client):
        created = getattr(pytest, "created_dealer", None)
        assert created
        r = client.get(f"{API}/dealers", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        ids = [it.get("id") for it in items]
        assert created["id"] in ids
        for it in items:
            assert it.get("kind") == "dealer"
            assert "_id" not in it

    def test_create_dealer_missing_required_422(self, client):
        # missing city
        payload = {
            "name": "TEST_NoCity",
            "email": "nocity@example.com",
            "phone": "+91 9000000000",
            "company": "TEST_Co",
        }
        r = client.post(f"{API}/dealers", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_dealer_invalid_email_422(self, client):
        payload = {
            "name": "TEST_BadEmailDealer",
            "email": "broken@",
            "phone": "+91 9000000000",
            "company": "TEST_Co",
            "city": "Mumbai",
        }
        r = client.post(f"{API}/dealers", json=payload, timeout=15)
        assert r.status_code == 422


# --------- Samples ---------
class TestSamples:
    def test_create_sample_valid(self, client):
        payload = {
            "name": "TEST_Sample User",
            "email": f"sample_{uuid.uuid4().hex[:8]}@example.com",
            "phone": "+91 9000000123",
            "address": "12 TEST Street, Bengaluru 560001",
            "products": ["bwp-gurjan", "marine-grade"],
            "notes": "Need 4x4 inch swatches.",
        }
        r = client.post(f"{API}/samples", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["kind"] == "sample"
        assert body["address"] == payload["address"]
        assert body["products"] == payload["products"]
        pytest.created_sample = body

    def test_sample_persisted_in_list(self, client):
        created = getattr(pytest, "created_sample", None)
        assert created
        r = client.get(f"{API}/samples", timeout=15)
        assert r.status_code == 200
        items = r.json()
        ids = [it.get("id") for it in items]
        assert created["id"] in ids
        for it in items:
            assert it.get("kind") == "sample"
            assert "_id" not in it

    def test_create_sample_missing_address_422(self, client):
        payload = {
            "name": "TEST_NoAddr",
            "email": "noaddr@example.com",
            "phone": "+91 9000000000",
        }
        r = client.post(f"{API}/samples", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_sample_empty_products_ok(self, client):
        payload = {
            "name": "TEST_EmptyProducts",
            "email": f"ep_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "+91 9000000111",
            "address": "Address line",
        }
        r = client.post(f"{API}/samples", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["products"] == []


# --------- Email graceful disable ---------
class TestEmailGracefulDegradation:
    """Email is intentionally disabled (no RESEND_API_KEY).
    Endpoints must not raise 500 due to email logic.
    Health must report email_enabled=False.
    """

    def test_health_reports_email_disabled(self, client):
        data = client.get(f"{API}/health", timeout=15).json()
        assert data["email_enabled"] is False

    def test_post_inquiry_no_500_with_email_disabled(self, client):
        r = client.post(f"{API}/inquiries", json={
            "name": "TEST_EmailGrace",
            "email": f"eg_{uuid.uuid4().hex[:6]}@example.com",
            "message": "Email should be skipped, no 500 expected.",
        }, timeout=20)
        assert r.status_code == 200, r.text
