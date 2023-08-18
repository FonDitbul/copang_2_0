import './globals.css'
import type { Metadata } from 'next'
import Headers from "@/components/Headers";
import Footer from "@/components/Footers";

export const metadata: Metadata = {
  title: 'copang!',
  description: 'copang store page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 justify-center">
          <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <Headers/>
          </div>
          <div>
            {children}
          </div>
          <div>
            <Footer/>
          </div>
        </main>
      </body>
    </html>
  )
}
