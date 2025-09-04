import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext"; 
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concept Nexus",
  description: "An interactive portal to the ConceptNet knowledge graph.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> 
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
