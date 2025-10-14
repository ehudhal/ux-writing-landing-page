import '@/app/globals.css'

import { Button } from '@/components/ui/button'
import { CircleHelp } from 'lucide-react'
import Link from 'next/link'
const NotFound = () => {
  return (
    <div className="text-offblack relative z-20 flex min-h-screen items-center justify-center bg-background-gray">
      <div className="mx-auto -mt-8 flex h-full w-full max-w-[90%] md:max-w-[800px] flex-col items-center justify-center gap-4 md:gap-6 rounded-3xl border bg-white p-8  pt-12 pb-16 ">
        <div className="flex size-24 md:size-32 items-center justify-center rounded-full bg-gray-100">
          <CircleHelp className="md:size-12 size-10 " />
        </div>
        <h3 className="text-center font-serif text-2xl md:text-3xl font-bold">
          {"This page isn't available"}
        </h3>
        <p className="text-center text-base md:text-lg max-w-[90%] md:max-w-[60%]">
          Sorry, we couldn&apos;t find what you were looking for.
          <br />
          The page may have moved or no longer exists.
        </p>
        <Link href="/">
          <Button>Go to homepage</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
