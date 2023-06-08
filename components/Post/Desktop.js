import { Stars } from './Stars'
import Image from 'next/image'
import { useState } from 'react'
import { Fav } from '@/components/Post/Fav'
import { useRouter } from 'next/router'
import { Submit } from '../Buttons/Submit'
import { Tertiary } from '../Buttons/Tertiary'
import { useSession } from '@/hooks/useSession'
export function Desktop ({ toggleFav, buttons = false, images, ownProduct, title, isFav, price, size, detail, calificacion, nombre, apellido, originalPrice, userId, id }) {
  const [imageList, setImageList] = useState(images)
  const [shown, setShown] = useState(0)
  const router = useRouter()
  const { session } = useSession()
  console.log(session)
  const addToCart = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicacionId: id })
    })
      .then(response => {
        console.log('Producto agregado al carrito:', response)
        alert('Producto agregado')
      })
      .catch(error => {
        console.error('Error al agregar el producto al carrito:', error)
      })
  }

  const handlePurchase = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicacionId: id })
    })
      .then(response => {
        router.push('/cart')
      })
      .catch(error => {
        console.error('Error al agregar el producto al carrito:', error)
      })
  }
  return (
    <div className='flex flex-row w-full items-center gap-10 mt-10  '>
      <article className="p-layoutSides gap-10 mb-10 mt-10 pl-40 justify-center">
        <figure className='h-fit max-w-[800px] aspect-video'>
          {imageList.map((src, i) => {
            if (i === shown) {
              return (
              <Image key={src + i} src={src} className='h-full object-contain w-full block rounded-tr-3xl rounded-tl-3xl' alt='Product image' width={100} height={100}/>
              )
            }
            return null
          })}
          <span className='flex gap-6 justify-around'>
            {
              imageList.map((src, i) => {
                if (i !== shown && i < 5) {
                  return (
                  <Image key={src + i} src={src} className='w-[140px] object-contain h-[140px] inline-block mt-4 cursor-pointer' alt='Product image' onClick={() => setShown(i)} width={100} height={100}/>
                  )
                } else if (i === 6) {
                  return (
                    <span onClick={() => setImageList(prev => prev.reverse())} key={i} className='w-[140px] h-[140px] inline-block mt-4 cursor-pointer text-white text-6xl text-center pt-10'>+{imageList.length - 6}</span>
                  )
                }
                return null
              })
            }
          </span>
        </figure>
      </article>
      <div className="flex flex-col max-w-1/2 mt-5 gap-10">
            <div className='flex flex-col justify-between h-[150px]'>
              {
                 originalPrice !== price && originalPrice
                   ? <div className='flex gap-4'>
                <p className='text-5xl font-extrabold leading-5 text-black line-through'>${originalPrice}</p>
                 <p className='text-5xl font-extrabold leading-5 text-red'>${price}</p>
                </div>
                   : <p className='text-5xl font-extrabold leading-5 text-black'>${price}</p>
              }
              <p className="text-3xl font-bold">{title}</p>
              <p className="text-2xl">{size.nombre}</p>
            </div>
            <span className='flex gap-2 p-0 text-left h-fit items-center'>
              { ownProduct ? null : <Fav state={isFav} toggleFav={toggleFav} /> }
            </span>
          <div className='mt-4'>
              <p className="text-xl mb-4 font-normal">{detail}</p>
              <div className='flex gap-10 mt-10 font-thin'>
                <p className="text-xl">{`${nombre} ${apellido}`}</p>
                <Stars rating={calificacion} />
              </div>
              <Submit center={true} onClick={handlePurchase}>COMPRAR</Submit>
              <Tertiary center={true} onClick={addToCart}>Agregar al carrito</Tertiary>
            </div>

        </div>
      </div>
  )
}
