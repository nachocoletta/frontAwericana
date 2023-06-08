import logo from '@/public/assets/logobig.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function Big ({ ...props }) {
  const { push } = useRouter()
  return <Image alt='Big logo' onClick={() => push('/')} src={logo} {...props}/>
}
