export function loginEmailHTML(url: string) {
  const safeUrl = url;
  return `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5; color:#0f172a;">
      <h2 style="margin:0 0 16px;">Inloggen bij FormulePlus</h2>
      <p style="margin:0 0 16px;">Klik op de onderstaande knop om veilig in te loggen. Deze link verloopt na korte tijd.</p>
      <p style="margin:24px 0;">
        <a href="${safeUrl}" style="display:inline-block;padding:12px 20px;text-decoration:none;border-radius:8px;border:1px solid #0ea5e9;">
          Inloggen
        </a>
      </p>
      <p style="font-size:12px;color:#64748b;">Werkt de knop niet? Plak deze link in je browser:<br/>${safeUrl}</p>
    </div>
  `;
}
