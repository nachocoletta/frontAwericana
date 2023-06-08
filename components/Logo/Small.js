import logosmall from '@/public/assets/logosmall.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function Small ({ ...props }) {
  const { push } = useRouter()
  return <Image alt='Small logo' onClick={() => push('/')} src={logosmall} {...props}/>
}
