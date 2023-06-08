import { Big } from '@/components/Logo/Big'

export function Footer () {
  return (
  <footer className="w-screen shadow-up h-[80px] mt-bigger md:h-[180px] flex items-center justify-around sm:gap-[8px] max-h-[200px] p-normal absolute bottom-0">
      <Big className='flex-1 w-[90px] max-h-[100px] max-w-[200px] md:mr-small'/>
      <p className='text-tiny whitespace-nowrap md:text-big'>AYUDA</p>
      <p className='text-tiny whitespace-nowrap md:text-big'>SOBRE NOSOTROS</p>
      <p className='text-tiny whitespace-nowrap md:text-big'>CONTACTO</p>
    </footer>
  )
}
