import Link from 'next/link'
import { HiTrash } from 'react-icons/hi'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Select } from '@/components/Input/Select'
import { Loading } from '@/components/Loading'

function MyProductsCard ({ title, price, imgUrl, id, handleDelete, handleDiscount, discount = '0%', discountPrice, applyDiscount }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(discount || 0)
  const [isLoading, setIsLoading] = useState(false)
  const DISCOUNT_OPTIONS = Array.from({ length: 20 }).map((_, i) => i !== 0 ? i * 5 : 0)
  console.log(discount)
  const close = () => setIsOpen(false)
  const handleSelect = (e) => setSelected(e.target.value)

  useEffect(() => {
    if (isLoading) {
      const discountNumber = +selected.replace('%', '')
      if (!isNaN(discountNumber)) {
        applyDiscount(id, discountNumber)
          .then(res => {
            if (res.ok) return res.json()
            else throw new Error({ error: 'Something went wrong.' })
          })
          .then(res => {
            handleDiscount(res?.publicacion)
            console.log(res.publicacion)
            setIsLoading(false)
            setIsOpen(false)
          })
          .catch(e => {
            setIsLoading(false)
            setIsOpen(false)
            console.error(e)
          })
      }
    }

    setIsLoading(false)
  }, [isLoading])

  if (isLoading) return <Loading />

  return (
    <div className='bg-white relative'>
      <div className={`flex px-5 py-4 mb-2 justify-stretch items-center gap-4 xl:gap-8 ${isOpen ? 'shadow-none' : 'shadow-down'} h-[112px] xl:h-[160px] xl:py-6`}>
        <Link href={'/detail/:id'} as={`/detail/${id}`}>
          <Image width={100} alt='Product image' height={100} className='h-[80px] w-[80px] xl:h-[112px] xl:w-[112px] bg-gray-700' src={imgUrl}/>
        </Link>

        <div className='flex flex-col self-stretch justify-between font-light text-sm leading-5 max-[480px]:w-3/5 min-[480px]:w-2/3 min-[540px]:w-3/4 min-[768px]:w-4/5'>
          <Link href={'/detail/:id'} as={`/detail/${id}`} className='text-base font-normal leading-5 text-black xl:text-2xl'>{title}</Link>
          {
            discount
              ? <div className='flex gap-4'>
                  <p className='text-base font-normal leading-5 text-black line-through xl:text-2xl'>${price}</p>
                  <p className='text-base font-normal leading-5 text-red xl:text-2xl'>${discountPrice}</p>
                </div>
              : <p className='text-base font-normal leading-5 text-black xl:text-2xl'>${price}</p>
          }
          <div className='flex justify-around gap-2'>
            <Link className='text-xs font-normal ml-4 leading-5 text-black underline xl:text-primary xl:text-lg xl:no-underline xl:hover:underline whitespace-nowrap' href={'/sell/edit-product/:id'} as={`/sell/edit-product/${id}`}>Editar publicación</Link>
            <p onClick={() => setIsOpen(!isOpen)} className='text-xs  cursor-pointer font-normal leading-5 text-black underline xl:text-primary xl:text-lg whitespace-nowrap xl:no-underline xl:hover:underline'>{discount === '0%' || discount === 0 ? 'Agregar descuento' : 'Modificar descuento'}</p>
          </div>
        </div>
        <HiTrash onClick={() => handleDelete(id)} className='text-[22px] right-0 absolute cursor-pointer xl:text-[40px] mr-7' />

      </div>
        {isOpen
          ? (
            <div className='block max-w-[500px] m-auto'>
              <Select onChange={handleSelect} defaultValue={`${discount}%`} buttons={true} label={'Selecciona el porcentaje de descuento'} close={close}>
                {DISCOUNT_OPTIONS.map(num => {
                  return <option key={num} value={num === 0 ? 0 : `${num}%`}>{num === 0 ? 'Sin descuento' : `${num}%`}</option>
                })}
              </Select>
              <span className='flex justify-around mt-2 bg-white w-full'>
                <button onClick={() => setIsLoading(true)} className='border-none outline-none underline'>Aceptar</button>
                <button onClick={() => close()} className='border-none outline-none underline'>Cancelar</button>
              </span>
              </div>
            )
          : ''}
    </div>
  )
}

export default MyProductsCard
