export default function MenuButton({
  onClick,
  icon: Icon,
  tooltip
}: {
  onClick: () => void
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  tooltip: string
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="rounded border border-gray-200 bg-white p-2 hover:bg-gray-200"
    >
      <Icon className="size-4" />
    </button>
  )
}
