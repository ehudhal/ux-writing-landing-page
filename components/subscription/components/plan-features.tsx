export function PlanFeatures() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Premium Plan Features</h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>
            {`${process.env.NEXT_PUBLIC_LICENSED_CREDITS} credits`} per seat per
            month
          </span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>
            AI-generated requirements, wireframes, and user flow charts
          </span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>Launch-ready content</span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>Export to Bolt.new, Loveable, Cursor</span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>Public and private shareable links</span>
        </li>
        <li className="flex items-start gap-2 text-sm">
          <span className="text-primary">✓</span>
          <span>Slack bot</span>
        </li>
      </ul>
    </div>
  )
}
