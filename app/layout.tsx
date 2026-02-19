import type { Metadata } from "next"
import { JetBrains_Mono, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const outfit = Outfit({
  variable: "--font-inter", // Keeping variable name consistent for now to avoid refactoring globals.css
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Future Corporation | Transforming Learning Through Robotics & AI",
  description:
    "Future Corporation trains young minds in robotics and AI, partners with schools, builds robotics labs, and provides professional career upskilling.",
  metadataBase: new URL("https://futurecorp.ai"),
  openGraph: {
    title: "Future Corporation | Robotics & AI Education",
    description:
      "Empowering the next generation of innovators with industrial-grade skills in robotics, AI, and futuristic technology.",
    url: "https://futurecorp.ai",
    siteName: "Future Corporation",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Corporation | Robotics & AI Education",
    description:
      "Empowering the next generation of innovators with industrial-grade skills in robotics, AI, and futuristic technology.",
  },
  other: {
    "theme-color": "#2596be",
  },
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Future Corporation",
  url: "https://futurecorp.ai",
  logo: "https://futurecorp.ai/logo.png",
  description:
    "Future Corporation trains young minds in robotics and AI, partners with schools, builds robotics labs, and provides professional career upskilling.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7319677613",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/future-corporation-in/",
    "https://www.instagram.com/futurecorpjsr",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-electric-blue selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
