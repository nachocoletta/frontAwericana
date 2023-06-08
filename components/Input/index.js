import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'

export function Input ({ type = 'text', placeholder, value, onChange, name, error, label }) {
  const [isShown, setIsShown] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div>
      <div className='relative mb-1.5'>
      <label className='text-xs font-light leading-tight absolute left-3 top-2' htmlFor={name}>{showLabel ? label : ''}
      </label>
        <input type={isShown ? 'text' : type} onFocus={() => setShowLabel(true)} onBlur={() => setShowLabel(false)} placeholder={ showLabel ? '' : placeholder} value={value} onChange={onChange} name={name} className={`my-0.5 w-full h-12 border ${type === 'number' ? 'appearance-none' : ''} border-solid ${error ? 'border-red' : 'border-primary'} text-gray-700 text-sm font-regular leading-tight text-black outline-none shadow-md p-3 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400`} />
        <span className="absolute inset-y-0 right-4 flex items-center pl-2">
        {type === 'password'
          ? (isShown ? <AiFillEyeInvisible className='h-4 w-6 fill-secondary cursor-pointer' onClick={() => setIsShown(!isShown)} /> : <AiFillEye className='h-4 w-6 fill-primary cursor-pointer' onClick={() => setIsShown(!isShown)} />)
          : null
        }
        </span>
      </div>
      {error ? <p className='font-normal text-normal text-red'>{error}</p> : ''}
    </div>
  )
}
