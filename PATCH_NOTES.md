PATCH_NOTES.md
Goal: Hero "pagina-vullend" + bovenkant van de afbeelding uitlijnen op de headerbalk.
Files:
- FormulePlus/app/globals.css  (1-op-1 vervanging)

Wijzigingen in .hero:
- background-position: 92% 0%  (top uitlijnen i.p.v. 25%)
- height & min-height: calc(100vh - var(--header-height))
- :root bevat nu --header-height: 72px  (matcht je .headerInner height)

Gebruik:
- Pak deze ZIP uit op de repo-root (geen extra maplaag).
- Deploy. De hero vult nu het scherm onder de sticky header en toont de bovenkant van de foto precies onder de balk.

Rollback:
- Vervang globals.css met je vorige versie.
