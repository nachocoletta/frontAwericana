import { Big } from '@/components/Logo/Big'
import Link from 'next/link'

export function ErrorLayout () {
  return (
    <section className="grid w-full h-full mt-20 place-content-center gap-10">
      <Big />
      <h1 className='text-center text-3xl font-black'>Algo salio mal :(</h1>
      <Link href={'/'}>
        <p className='text-center text-2xl underline'>Volver al inicio</p>
      </Link>
    </section>
  )
}
