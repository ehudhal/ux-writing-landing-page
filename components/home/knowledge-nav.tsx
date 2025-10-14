import { knowledgeProductsPageUrl } from '@/lib/app-routes'
import { motion } from 'framer-motion'
import { Box } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function KnowledgeNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-[#F6F6F7] rounded-lg p-3 py-4 w-full">
      <h4 className="text-sm font-medium text-offblack/60 mb-2 px-2">
        Knowledge
      </h4>
      <ul className="flex size-full flex-col justify-start gap-1">
        <div className="relative">
          {pathname.includes('products') && (
            <motion.div
              layoutId="active-nav"
              className="absolute inset-0 bg-white rounded-lg"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <Button
            variant={'ghost'}
            className="w-full justify-start gap-3 px-2 rounded-lg transition-all active:bg-white/70 hover:bg-white/50 relative"
            asChild
          >
            <Link href={knowledgeProductsPageUrl()}>
              <Box strokeWidth={1} className="size-5" />
              Product details
            </Link>
          </Button>
        </div>
      </ul>
    </nav>
  )
}
