export const highlightText = (title: string, searchText: string) => {
  if (!searchText) return title

  const parts = title.split(new RegExp(`(${searchText})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <b key={index}>{part}</b>
        ) : (
          part
        )
      )}
    </>
  )
}
