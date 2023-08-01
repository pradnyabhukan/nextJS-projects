import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Full stack App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head/>
      
      <body className={inter.className}>
      <nav>
        <h1>logo</h1>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
        {children}
      </body>
    </html>
  )
}
