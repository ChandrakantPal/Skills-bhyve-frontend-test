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
        className="w-full p-3 transition duration-200 bg-gray-900 border border-gray-300 rounded outline-none focus:bg-gray-200 hover:bg-gray-200 hover:text-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default InputGroup
