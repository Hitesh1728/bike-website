import './globals.css'

export const metadata = {
  title: 'Royal Enfield | Legend Reborn',
  description: 'Experience the modern classic.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}