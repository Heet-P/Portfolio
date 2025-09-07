import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Heet Parikh - Portfolio",
  description: "Student & Developer Portfolio",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${jetbrainsMono.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${jetbrainsMono.variable};
  --font-jetbrains: ${jetbrainsMono.variable};
}
        `}</style>
      </head>
      <body className={`${jetbrainsMono.variable} font-mono`}>{children}</body>
    </html>
  )
}
