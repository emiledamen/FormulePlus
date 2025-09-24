PATCH_NOTES.md
1-op-1 vervanging, op repo-root uitpakken:
- `app/globals.css`: 
  - `img.brand { height:52px; width:auto; }` (logo blijft netjes, geen full-width)
  - `.hero { margin-top:-30px; background-position:0% 0%; background-size:auto 100%; height:600px; min-height:600px; }`
  - Shop: full-bleed 100vw, gecentreerd, titels verborgen, track zonder gap + animatie, kaarten 440/480 (mobile 360), 2:1, rechte hoeken
- `app/page.tsx`: shop-items verdubbeld (`__loop = [...items, ...items]`) voor **naadloze** loop (geen hapering/restart).
