// app/layout.tsx
import { fonts } from "./fonts";
import { Providers } from "./provider/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={fonts.rubik.variable}>
      <head>
        <title>Diabetes-Calculator</title>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
