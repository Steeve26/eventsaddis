import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider, SignedIn } from '@clerk/nextjs'
import './globals.css'
import Header from "@/components/shared/Header";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "EventsAddis",
  description: "Platform for events in AddisAbaba",
  icons: {
    icon: '/assets/images/favicon.ico'
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>
          {/* <Header></Header> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

