export function Tertiary ({ center, children, ...props }) {
  return (
    <button type="button" {...props} className={`border-green-400 border w-full hover:scale-110 md:w-[28rem] min-w-[200px]  relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl ${center ? 'self-center' : 'self-start'} font-md text-lg`}>
        {children}
    </button>
  )
}
