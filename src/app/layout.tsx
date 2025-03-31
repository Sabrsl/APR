import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientLayout from "@/components/layout/RootClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APR Sénégal | Alliance Pour la République",
  description: "Site officiel du parti politique Alliance Pour la République (APR) au Sénégal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  );
}
