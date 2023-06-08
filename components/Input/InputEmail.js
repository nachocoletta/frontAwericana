import { AiOutlineLine } from 'react-icons/ai'

export default function InputEmail () {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        className='pl-4 py-4 w-[40px] border border-solid border-primary text-gray-700 text-sm font-regular leading-tight text-black outline-none shadow-md rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400'
      />
      <AiOutlineLine
        style={{
          position: 'absolute',
          bottom: '5px',
          left: '12px'
        }}
      />
    </div>
  )
}
