import logo from '@/public/assets/logobig.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function error ({ ...props }) {
  const { push } = useRouter()
  return <Image alt='Error' onClick={() => push('/')} src={logo} {...props}/>
}
