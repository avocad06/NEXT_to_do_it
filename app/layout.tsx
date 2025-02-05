import Navbar from './components/navbar/navbar';
import './styles/global.css';
import { square } from './styles/fonts';


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={square.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
