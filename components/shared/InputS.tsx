'use client'
interface InputProps {
  id: string
  type?: string
  placeholder?: string
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function InputS({
  id,
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-state-orange focus-within:ring-1 focus-within:ring-state-orange dark:border-gray-700 dark:bg-gray-800'
      >
        <input
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-white'
        />

        <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200'>
          {label}
        </span>
      </label>
    </div>
  )
}
