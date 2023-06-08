import { createPortal } from 'react-dom'
import { Label } from './Label'
import { HiUser } from 'react-icons/hi2'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { AiFillHeart, AiFillCloseSquare } from 'react-icons/ai'
import { ImPriceTag } from 'react-icons/im'
import { useAuth } from '@/hooks/useAuth'
import { useSession } from '@/hooks/useSession'

function SettingsComponent () {
  const { session } = useSession()
  const { logout } = useAuth()

  const handleLogout = () => {
    if (window) window.location.reload()
    logout()
  }

  return (
    <nav className="w-screen shadow-down px-2 max-w-[400px] h-fit z-20 absolute top-20 bg-white right-0 lg:right-32 xl:right-40">
      <h3 className='m-small mt-medium font-bold'>{session?.nombre + ' ' + session?.apellido}</h3> {/* Cambiar por nombre y apellido correspondientes */}
      <div className='flex flex-col justify-around h-full'>
        <Label href='/profile' Icon={HiUser}>
          Mis Datos
        </Label>
        <Label href='/profile/directions' Icon={BsFillHouseDoorFill}>
          Direcciones
        </Label>
        <Label href='/favorite' Icon={AiFillHeart}>
          Mis Favoritos
        </Label>
        <Label href='/sell' Icon={ImPriceTag}>
          Vender
        </Label>
        <p onClick={handleLogout} className='flex cursor-pointer items-center gap-5 border-b-grayish py-4 border-b-[1px]'>
          <AiFillCloseSquare className='fill-primary' />
          Cerrar sesión
        </p>
      </div>
    </nav>
  )
}

export function Settings () {
  return createPortal(<SettingsComponent/ >, document.querySelector('.PORTAL_REF'))
}
