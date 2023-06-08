import wSrc from '@/public/assets/W.svg'
import Image from 'next/image'

export function W (props) {
  return <Image src={wSrc} alt='Awericana W' width={100} height={100} {...props} />
}
