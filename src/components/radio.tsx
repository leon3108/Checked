export default function Radio({
  htmlFor,
  label,
  placeholder,
  onchange,
  value,
  isError,
  name,
}: {
  htmlFor: string
  label: string
  placeholder: string
  onchange: (e: any) => void
  value?: string
  isError?: boolean
  name: string
}) {
  return (
    <div className="flex items-center my-2">
      <label
        htmlFor={htmlFor}
        className={`text-gray-900 w-32
    ${isError ? 'text-red' : ''}`}
      >
        {label} {isError ? ' is required' : ''}
      </label>
      <input
        onChange={onchange}
        type="radio"
        name={name}
        id={htmlFor}
        className={`bg-gray-50 border border-gray-300 text-gray-900 
  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
  block${isError ? 'border-red' : ''}`}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
