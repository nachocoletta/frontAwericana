import Image from 'next/image'
import card from '@/public/assets/img-card/card.png'

const Card = ({
  precio = 'No especificado',
  titulo = 'No especificado',
  talleMedidas = 'No especificado',
  imgSrc = card,
  precioOriginal,
  descuento
}) => {
  return (
        <div className='inline-flex flex-col'>
            <div className='my-3'>
                <Image
                    className='rounded-lg object-contain aspect-video'
                    src={imgSrc}
                    width={297}
                    height={154}
                    alt="producto"
                    loading='lazy'
                />
            </div>
            <div className='ml-0'>
                {
                  descuento > 0
                    ? <div className='flex gap-4'>
                        <p className='font-bold text-3xl leading-5 text-black line-through xl:text-2xl'>${precioOriginal}</p>
                        <p className='font-bold text-3xl leading-5 text-red xl:text-2xl'>${precio}</p>
                      </div>
                    : <p className='font-bold text-3xl leading-5 text-black xl:text-2xl'>${precio}</p>
                            }
                <p className='font-normal text-2xl'>{titulo}</p>
                <p className='font-normal text-xl'>{talleMedidas}</p>
            </div>
        </div>
  )
}

export default Card
