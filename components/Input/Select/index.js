export function Select ({ children, label = null, onChange, defaultValue }) {
  return (
    <div className='min-w-[300px] relative bg-white'>
      <label className='text-xs font-light leading-tight absolute left-3 top-2'>{label ? label : ''}</label>
      <select defaultValue={defaultValue} onChange={onChange} className='my-0.5 w-full h-12 overflow-y-scroll border border-solid  text-gray-700 text-sm font-regular leading-tight border-green-700 text-black outline-none shadow-md p-3 rounded-tr-xl rounded-tl-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400'>
        {children}
      </select>
    </div>
  )
}
