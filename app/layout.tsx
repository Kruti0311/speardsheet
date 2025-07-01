import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spreadsheet Prototype',
  description: 'Created by Kruti Sakariya',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
