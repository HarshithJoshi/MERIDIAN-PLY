"""One-off generator: 5 cinematic woody luxury interior photographs for the
   Interiors section of the Meridian Plywood site. Saves JPG files into
   /app/frontend/public/images/.
"""
import asyncio
import base64
import os
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
assert API_KEY, "EMERGENT_LLM_KEY missing"

OUT_DIR = Path("/app/frontend/public/images")
OUT_DIR.mkdir(parents=True, exist_ok=True)

COMMON = (
    "Award-winning architectural photography, cinematic editorial style for AD Magazine. "
    "Rich walnut/oak wood grain dominates the frame. Dark warm luxury palette: charcoal, "
    "walnut brown, deep tan, brass and copper accents. Moody architectural lighting with "
    "soft warm pools of light, deep shadows, ambient golden hour. Photoreal, ultra detailed "
    "wood grain texture, shallow depth of field, 35mm full-frame, vertical 4:5 framing. "
    "Architectural Digest, Casa Vogue, Wallpaper magazine aesthetic. No people."
)

SUBJECTS = [
    (
        "interior_kitchen.jpg",
        "Cinematic photograph of a modern luxury kitchen with floor-to-ceiling fluted "
        "walnut cabinetry, a long honed black marble island lit by a low brass linear "
        "pendant, integrated walnut handles, brushed bronze tapware, dark herringbone wood floor, "
        "moody atmospheric lighting from a single tall window on the left. " + COMMON,
    ),
    (
        "interior_wardrobe.jpg",
        "Cinematic photograph of a walk-in wardrobe with full-height vertical walnut slat "
        "panels, fluted wood doors with vertical reeded texture, integrated soft warm LED "
        "underlighting on hanging rails, a centered upholstered dark leather island bench, "
        "polished wide-plank walnut floor reflecting subtle highlights. " + COMMON,
    ),
    (
        "interior_lobby.jpg",
        "Cinematic photograph of a boutique hotel lobby clad in book-matched dark walnut "
        "veneer wall panels with subtle reveal lines, a sculptural curved walnut reception desk, "
        "a sculptural brass pendant chandelier, a Persian rug, deep leather lounge chairs, "
        "soft architectural cove lighting, marble floor inlays. " + COMMON,
    ),
    (
        "interior_library.jpg",
        "Cinematic photograph of a private home library with floor-to-ceiling solid walnut "
        "shelving filled with leather-bound books, a rolling brass library ladder, a deep "
        "tan leather Chesterfield armchair, a vintage Persian rug, brass sconces casting warm "
        "pools of light, herringbone walnut floor, single shaft of late afternoon sunlight. " + COMMON,
    ),
    (
        "interior_bath.jpg",
        "Cinematic photograph of a sculptural luxury bathroom with full walnut veneer wall "
        "cladding, a freestanding stone bathtub centered in front of a tall slatted wood "
        "window screen, brass wall-mounted tap, integrated walnut vanity with vessel basin, "
        "warm pool of light from a single skylight overhead, herringbone wood floor. " + COMMON,
    ),
]


async def gen_one(filename: str, prompt: str):
    chat = LlmChat(
        api_key=API_KEY,
        session_id=f"meridian-interior-{filename}",
        system_message="You are a luxury architectural interior photographer.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        raise RuntimeError(f"No image returned for {filename}. Text: {text!r}")
    img = images[0]
    out_path = OUT_DIR / filename
    out_path.write_bytes(base64.b64decode(img["data"]))
    print(f"  wrote {out_path} ({out_path.stat().st_size // 1024} KB)")
    return out_path


async def main():
    print(f"Generating {len(SUBJECTS)} interiors → {OUT_DIR}")
    tasks = [gen_one(name, prompt) for (name, prompt) in SUBJECTS]
    paths = await asyncio.gather(*tasks)
    print("DONE", [str(p) for p in paths])


if __name__ == "__main__":
    asyncio.run(main())
