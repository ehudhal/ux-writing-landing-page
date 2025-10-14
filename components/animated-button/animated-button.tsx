import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import classes from './animated-button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => {
    return (
      <>
        <button
          className={cn(
            props.className,
            'flex items-center justify-center gap-2 rounded-full bg-offblack px-6 py-3 font-sans text-sm text-white disabled:pointer-events-none disabled:opacity-50',
            !props.disabled && classes.container
          )}
          ref={ref}
          {...props}
        >
          <div className="flex items-center justify-center">
            {props.children}
          </div>
        </button>
      </>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'
export default AnimatedButton
