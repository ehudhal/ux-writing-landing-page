'use client'
import { ProductAvatar } from '@/app/(app)/(home)/knowledge/components/product-avatar'
import {
  designsPageUrl,
  productPageUrl,
  sharedDesignsPageUrl
} from '@/lib/app-routes'
import { Design, ProductWithLogo } from '@/lib/db-schema/designs'
import { Screen } from '@/lib/db-schema/screens'
import { Slash } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '../ui/breadcrumb'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type DesignBreadcrumbsProps = {
  designWithScreens: Design & { screens: Screen[] } & { sharedWithMe: boolean }
  derivedFromProduct: ProductWithLogo | null
  isPublicPage: boolean
}

export default function DesignBreadcrumbs({
  designWithScreens,
  derivedFromProduct,
  isPublicPage
}: DesignBreadcrumbsProps) {
  const isSharedWithMe = designWithScreens.sharedWithMe

  const { screenId } = useParams()

  const currentScreen = designWithScreens?.screens.find(
    s => s && s.screenId === screenId
  )
  return (
    <div className="hidden items-center justify-start gap-2 px-4 md:flex">
      <Breadcrumb>
        <BreadcrumbList>
          {!isPublicPage && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={
                    isSharedWithMe ? sharedDesignsPageUrl() : designsPageUrl()
                  }
                >
                  {isSharedWithMe ? 'Shared with me' : 'PRDs'}
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="contents">
                <Slash />
              </BreadcrumbSeparator>
            </>
          )}

          {designWithScreens && (
            <Tooltip>
              <TooltipTrigger>
                <BreadcrumbItem className="line-clamp-1 text-left max-w-[300px] md:max-w-[500px]">
                  {designWithScreens.title}
                </BreadcrumbItem>
              </TooltipTrigger>
              <TooltipContent>{designWithScreens.title}</TooltipContent>
            </Tooltip>
          )}
          {currentScreen && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>{currentScreen.title}</BreadcrumbItem>
            </>
          )}
          {!isPublicPage && derivedFromProduct && (
            <>
              <BreadcrumbSeparator>
                <div className="aspect-square size-2 rounded-full bg-[#F2F2F4]"></div>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={productPageUrl(derivedFromProduct.designId)}
                  className="group flex max-w-[300px] items-center gap-1.5"
                >
                  {derivedFromProduct?.logoUrl && (
                    <ProductAvatar logoUrl={derivedFromProduct.logoUrl} />
                  )}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="flex text-xs  text-slate-500 transition-colors group-hover:text-offblack ">
                        Using
                        <span className="mx-1 line-clamp-1 max-w-[20ch] font-medium">
                          {derivedFromProduct?.title}
                        </span>
                        knowledge
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{derivedFromProduct?.title}</TooltipContent>
                  </Tooltip>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export function DesignBreadcrumbsSkeleton() {
  return (
    <div className="hidden items-center  justify-start gap-2 md:flex">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Skeleton className="h-4 w-40" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Skeleton className="h-4 w-40" />
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        variant="ghost"
        className={'aspect-square size-8 rounded-sm p-0'}
      />
    </div>
  )
}
