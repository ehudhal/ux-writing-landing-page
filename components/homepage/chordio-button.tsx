import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function PRDKitButton({ children, ...props }: Props) {
  return (
    <button
      className="whitespace-nowrap grain-effect gradient-bg w-full bg-cover px-14 py-3 font-medium text-offblack transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-black/10 hover:shadow-lg active:scale-[0.98] active:shadow-none active:brightness-95 lg:size-min lg:px-16 lg:py-3 lg:text-lg rounded-full cursor-pointer flex "
      {...props}
    >
      {children}
    </button>
  )
}
