import { W } from './W'
import { A } from './A'

export function Loading () {
  return (
    <div className='flex justify-center w-full h-full items-center'>
        <A className='w-[80px] h-[80px] scale-150'/>
        <W className='w-[90px] h-[90px] scale-150 -ml-12 mb-5 animate-loading-w delay-100 anim'/>
    </div>
  )
}
