import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface VisuallyHiddenProps {
  children: React.ReactNode
}

export default function VisuallyHiddenRoot({ children }: VisuallyHiddenProps) {
  return <VisuallyHidden.Root>{children}</VisuallyHidden.Root>
}
