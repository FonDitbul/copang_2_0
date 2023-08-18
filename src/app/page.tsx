import Image from 'next/image'
import Headers from '@/components/Headers'
import Footer from "@/components/Footers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 justify-center">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Headers/>
      </div>
      <div>
        Home 부분
      </div>
      <div>
        <Footer/>
      </div>
    </main>
  )
}
