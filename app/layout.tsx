import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paint Match - Find Your Perfect Sherwin-Williams Color",
  description:
    "Choose any color to find matching Sherwin-Williams paint colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-50 to-gray-100`}
      >
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                Color Picker
              </span>
            </div>
            <a
              href="https://www.sherwin-williams.com/en-us/color/color-tools/color-visualizer/active/color-wall/section/sherwin-williams-colors"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sherwin-Williams Colors
            </a>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Paint Match. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
