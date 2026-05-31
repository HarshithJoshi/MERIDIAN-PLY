"""One-off generator: 3 cinematic monochrome portraits of Indian architects/designers
   for the Testimonials section. Saves PNG files into /app/frontend/public/images/.
"""
import asyncio
import base64
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
assert API_KEY, "EMERGENT_LLM_KEY missing"

OUT_DIR = Path("/app/frontend/public/images")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Each subject: (filename, prompt)
SUBJECTS = [
    (
        "portrait_aanya.png",
        (
            "Cinematic monochrome black-and-white portrait of a confident Indian woman "
            "in her early 30s, principal architect, warm intelligent eyes, soft architectural "
            "studio lighting from the left, charcoal blazer over white shirt, subtle film grain, "
            "shallow depth of field, looking directly at camera, calm and assured expression, "
            "extreme high detail skin texture, editorial fashion photography style, dark seamless "
            "background, vertical 4:5 framing, head and shoulders. Hyperrealistic, professional."
        ),
    ),
    (
        "portrait_rohan.png",
        (
            "Cinematic monochrome black-and-white portrait of an Indian man in his late 30s, "
            "head of production at a furniture atelier, thoughtful composed expression, salt-and-pepper "
            "stubble beard, dark turtleneck sweater, side lighting from a north-facing window, "
            "subtle film grain, shallow depth of field, slightly off-axis gaze, hyperrealistic skin "
            "detail, editorial portraiture, dark seamless background, vertical 4:5 framing, head and "
            "shoulders. Architectural digest style."
        ),
    ),
    (
        "portrait_priya.png",
        (
            "Cinematic monochrome black-and-white portrait of a poised Indian woman in her late 30s, "
            "interior designer, sleek shoulder-length hair, minimal silver jewelry, charcoal silk "
            "blouse, soft directional studio key light from upper right, gentle confident smile, "
            "looking just past the camera, subtle film grain, hyperrealistic skin detail, editorial "
            "portrait photography, dark seamless background, vertical 4:5 framing, head and shoulders. "
            "Vogue editorial aesthetic, calm sophistication."
        ),
    ),
]


async def gen_one(filename: str, prompt: str):
    chat = LlmChat(api_key=API_KEY, session_id=f"meridian-{filename}", system_message="You are a portrait image generator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        raise RuntimeError(f"No image returned for {filename}. Text: {text!r}")
    img = images[0]
    out_path = OUT_DIR / filename
    out_path.write_bytes(base64.b64decode(img["data"]))
    print(f"  wrote {out_path} ({len(img['data'])//1024} KB b64)")
    return out_path


async def main():
    print(f"Generating {len(SUBJECTS)} portraits → {OUT_DIR}")
    tasks = [gen_one(name, prompt) for (name, prompt) in SUBJECTS]
    paths = await asyncio.gather(*tasks)
    print("DONE", [str(p) for p in paths])


if __name__ == "__main__":
    asyncio.run(main())
