PATCH_NOTES.md
Goal
- Maak de hero pagina-vullend (100vh onder de vaste/sticky header) en lijn de bovenkant van het plaatje uit op de headerbalk.

Wat zit er in deze patch
- src/components/HeroFull.tsx  → Drop-in component die de hero-hoogte zet op `calc(100vh - headerHeight)` en `object-top` gebruikt.
- src/app/hero-demo/page.tsx   → Optionele demo-route om de hero te testen zonder je bestaande pagina aan te passen.

Gebruik
1) Importeer op je homepage (of waar je de hero wilt):
   import HeroFull from "@/components/HeroFull";

2) Plaats het component **onder** je vaste header en geef de headerhoogte in pixels mee:
   <HeroFull headerHeight={72} />

   - Headerhoogte 72px is een veilige default; pas aan naar jouw echte header (bv. 64, 80, 96).
   - De afbeelding pakt standaard `/hero-formuleplus.webp` (in /public). Verander via prop `src` indien nodig.

3) Wil je eerst testen? Ga naar /hero-demo in je lokale/dev omgeving.

Opmerkingen
- Er is **geen tekst-overlay**; dit respecteert je eerdere keuze. Je kunt desgewenst children toevoegen aan het component.
- De afbeelding wordt met `object-cover object-top` gevuld: altijd paginavullend, en de top blijft onder de header zichtbaar.

Rollback
- Verwijder de bestanden uit deze patch als je wilt terugdraaien.
