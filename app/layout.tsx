import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/common/providers";
import '@/lib/time-ago-setup';

const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://event-management-app-jet.vercel.app/`
  : "http://localhost:3000";

export const metadata:Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Connect - Campus Events Management and Ticketing.",
  description: "Manage and attend campus events with ease. Create, promote, and ticket your events in one place ",
  keywords: ["Connect","Campus Events", "Events Management", "Ticketing University Events", "College Events", "Events Registration", "Attendance Tracking"]
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
