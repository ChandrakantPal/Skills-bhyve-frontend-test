import classNames from 'classnames'

interface InputGroupProps {
  className?: string
  type: string
  placeholder: string
  value: string
  setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className="w-full p-3 transition duration-200 bg-gray-900 border border-gray-300 rounded outline-none focus:bg-gray-800 focus:text-blue-300 focus:border-blue-300 hover:bg-gray-800 hover:text-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default InputGroup
