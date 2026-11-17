import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octopus store",
  description: "The new store of Octopus items",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { navigation, headerCta, footerColumns } = getSiteContent();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header navLinks={navigation} cta={headerCta} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer columns={footerColumns} />
      </body>
    </html>
  );
}
