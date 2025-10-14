import { useQueryState } from 'nuqs'

export function useHomePageSearch() {
  const [searchValue, setSearchValue] = useQueryState('q')

  const handleSearchChange = (newValue: string) => {
    setSearchValue(newValue)
  }

  return {
    onSearchChange: handleSearchChange,
    searchValue: searchValue || ''
  }
}
