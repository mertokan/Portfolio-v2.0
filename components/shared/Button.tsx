import classNames from 'classnames'
import {ReactNode} from 'react'
import {cn} from '@/lib/utils'
interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'projectButton' | 'dashboardButton'
  size?: 'normal' | 'small' | 'medium' | 'xsmall'
  as?: keyof JSX.IntrinsicElements | React.ElementType
  [key: string]: any // Other props passed down to the element
}

const Button = ({
  children,
  as: Component = 'button',
  variant = 'primary',
  size = 'normal',
  ...props
}: ButtonProps) => {
  return (
    <Component
      {...props}
      className={cn(
        'items-center justify-center border rounded-[50px] font-medium transition-all duration-300',
        {
          'bg-state-yellow border-state-yellow text-site-darkcolor2 hover:-translate-y-1 hover:shadow-lg hover:shadow-state-yellow/30':
            variant === 'primary',
          'inline-flex border-state-yellow text-state-yellow hover:bg-state-yellow hover:text-neutral-10 hover:shadow-lg hover:shadow-state-yellow/30':
            variant === 'secondary',
          'flex bg-state-yellow border-state-yellow text-site-darkcolor2 hover:shadow-lg hover:shadow-state-yellow/30 md:gap-3 gap-1 h-max':
            variant === 'projectButton',
          'border-state-red text-state-red hover:bg-state-red/70 hover:text-neutral-0 hover:shadow-lg hover:shadow-state-red/30 w-full h-full !rounded-xl':
            variant === 'dashboardButton',

          'py-3': size === 'normal',
          'px-[3.2em] py-[0.69em]': size === 'small',
          'px-[1.5em] py-[12px]': size === 'medium',
          'px-[7px] md:px-3 lg:px-8 py-2 lg:py-[10px]': size === 'xsmall',
        }
      )}
    >
      {children}
    </Component>
  )
}

export default Button
