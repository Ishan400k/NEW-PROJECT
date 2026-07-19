import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ज्ञानसेतु — आपका निजी ज्ञान साथी",
  description: "Read, listen, understand and learn from your documents.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
