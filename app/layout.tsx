import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Apollo 247 | Clone - Book Appointment Online with General Physician & Internal Medicine Doctors near you | Apollo 247",
  description:
    "General Physician & Internal Medicine - Consult experienced general physicians and internal medicine doctors online at Apollo 247 for diagnosis and treatment of common illnesses, chronic conditions, and preventive care. Book an appointment today.",
  icons: {
    icon: "https://images.apollo247.in/images/icons/apollo247.svg",
    apple: "https://images.apollo247.in/images/icons/apollo247.svg",
    shortcut: "https://images.apollo247.in/images/icons/apollo247.svg",
  },
  keywords: [
    "General Physician",
    "Internal Medicine",
    "Online Consultation",
    "Health Checkup",
    "Preventive Care",
    "Chronic Conditions",
    "Common Illnesses",
    "Apollo 247",
  ],
  openGraph: {
    siteName: "Apollo 247 | Clone",
    title:
      "Apollo 247 | Clone - Book Appointment Online with General Physician & Internal Medicine Doctors near you | Apollo 247",
    description:
      "General Physician & Internal Medicine - Consult experienced general physicians and internal medicine doctors online at Apollo 247 for diagnosis and treatment of common illnesses, chronic conditions, and preventive care. Book an appointment today.",
    url: "https://apollo-clone-ten.vercel.app/",
    images: ["https://www.apollo247.com/online-doctor-consultation.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "General Physician - Book Appointment Online with General Physician & Internal Medicine Doctors near you | Apollo 247",
    description:
      "General Physician & Internal Medicine - Consult experienced general physicians and internal medicine doctors online at Apollo 247 for diagnosis and treatment of common illnesses, chronic conditions, and preventive care. Book an appointment today.",
    images: ["https://www.apollo247.com/online-doctor-consultation.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
