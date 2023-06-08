import aSrc from '@/public/assets/A.svg'
import Image from 'next/image'

export function A (props) {
  return <Image src={aSrc} alt='Awericana A' width={100} height={100} {...props} />
}
