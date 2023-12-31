import { Alice } from 'next/font/google'
import './globals.css'
import NavBar from './components/navbar'

const inter = Alice({ subsets: ['latin'], weight: ["400"] })

export const metadata = {
  title: 'BESTIE',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  )
}
