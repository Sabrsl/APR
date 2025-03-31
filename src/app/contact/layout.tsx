import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | APR Sénégal",
  description: "Contactez l'Alliance Pour la République au Sénégal",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 