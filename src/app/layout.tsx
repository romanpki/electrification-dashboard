import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UnitProvider } from "@/hooks/useUnitToggle";

export const metadata: Metadata = {
  title: "Électrification des Usages en France | Dashboard",
  description:
    "Visualisation interactive de l'électrification des usages énergétiques en France par secteur d'activité. Données SDES, ODRE, RTE, Eurostat.",
  openGraph: {
    title: "Électrification des Usages en France",
    description:
      "Dashboard interactif de suivi de l'électrification de l'énergie en France",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <UnitProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </UnitProvider>
      </body>
    </html>
  );
}
