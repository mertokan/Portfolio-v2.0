import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
interface SymbolProps {
  variant?: 'primary' | 'secondary'
  children?: React.ReactNode
  to: string 
  target?: '_self' | '_blank' | '_parent' | '_top' 
}
const Symbol = ({variant = 'primary', children, to, target}: SymbolProps) => {
  return (
    <>
      <Link
        href={to}
        target={target}
        className={classNames(
          'rounded-full border-2  h-11 w-11 flex justify-center items-center transition-colors duration-300 text-lg',
          {
            'text-neutral-6 border-white/10 hover:text-neutral-3 hover:border-neutral-3':
              variant === 'primary',
            'border-[1px] text-neutral-6 border-white/10 hover:border-state-yellow':
              variant === 'secondary',
          }
        )}
      >
        {children}
      </Link>
    </>
  )
}

export default Symbol
