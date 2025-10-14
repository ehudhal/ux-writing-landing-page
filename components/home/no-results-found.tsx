import { Search } from 'lucide-react'

export const NoSearchResults = () => {
  return (
    <div className="mx-auto -mt-8 flex h-full max-w-[400px] flex-col items-center justify-center gap-3">
      <div className="flex size-16 items-center justify-center rounded-full bg-background-gray">
        <Search strokeWidth={1} />
      </div>
      <h3 className=" font-bold">No results found</h3>
      <p className="max-w-[300px] text-center md:max-w-[400px]">
        We couldn&apos;t find results for your search term. Try refining your
        search.
      </p>
    </div>
  )
}
