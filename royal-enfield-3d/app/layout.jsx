import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Royal Enfield | Legend Reborn',
  description: 'Experience the modern classic.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights /> 
      </body>
    </html>
  )
}