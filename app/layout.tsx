export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TankeArena för Kultur</title>
        <link
          rel="icon"
          type="image/png"
          href="icon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="icon/favicon.svg" />
        <link rel="shortcut icon" href="icon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="icon/apple-touch-icon.png"
        />
        <link rel="manifest" href="icon/site.webmanifest" />
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
