import Image from 'next/image'

type PRDKitLogoProps = {
  className?: string
  variant?: 'full' | 'symbol'
  color?: 'offblack' | 'white'
}

export default function PRDKitLogo({
  className,
  variant = 'full',
  color = 'offblack'
}: PRDKitLogoProps) {
  if (variant === 'symbol') {
    return <SymbolLogo className={className} color={color} />
  }
  return <FullLogo className={className} color={color} />
}

const FullLogo = ({
  className,
  color
}: {
  className?: string
  color?: 'offblack' | 'white'
}) => {
  return (
    <Image
      src={color === 'offblack' ? '/prdkit-logo.svg' : '/prdkit-logo-white.svg'}
      alt="PRDKit Logo"
      width={129}
      height={33}
      className={className}
    />
  )
}

const SymbolLogo = ({
  className,
  color
}: {
  className?: string
  color?: 'offblack' | 'white'
}) => {
  return (
    <Image
      src={
        color === 'offblack'
          ? '/prdkit-logo-symbol.svg'
          : '/prdkit-logo-symbol-white.svg'
      }
      alt="PRDKit Logo"
      width={22}
      height={33}
      className={className}
    />
  )
}
