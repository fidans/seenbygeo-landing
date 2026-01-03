export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://www.seenbygeo.com/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
