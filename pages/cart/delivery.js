import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import Link from 'next/link'
import { useSession } from '@/hooks/useSession'
import Head from 'next/head'
export default function Index () {
  const [carritoData, setCarritoData] = useState(null)
  const { session } = useSession()

  useEffect(() => {
    const fetchCarritoData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, { credentials: 'include' })
        const data = await response.json()
        setCarritoData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCarritoData()
  }, [])

  return (
<Layout>
      <Head>
        <title>Mi Carrito</title>
      </Head>
    <Header/>
    <div className='px-[10%]'>
      <h3 className='mt-20 mb-5 text-3xl'>Producto</h3>
      <section >
      {carritoData?.carrito && (
        <div className=''>
          {carritoData.carrito.map((item) => (
            <div className='flex mt-5 py-4 px-11 shadow-down w-full justify-between items-center h-[160px]' key={item.publicacion.id}>
            <div className='flex items-center '>
            <img className='w-[112px] h-[112px]' src={item.publicacion.imagenPortada}/>
             <div className='pl-4'>
               <p className='text-2xl'>{item.publicacion.titulo}</p>
               <p className='text-1xl'>{item.publicacion.talleId}</p>
              </div>
            </div>
              <p className='text-1xl' > Arg ${item.publicacion.precio}</p>
            </div>
          ))}
        </div>
      )}
      </section>
      <h3 className='mt-8 mb-8 text-3xl'>Envio</h3>

      <section >
         <div className='flex flex-col mt-5 py-4 px-11 shadow-down w-full justify-between '>
          <div>
           <div className='flex justify-between pb-4'>
           <div>
           <input
        type="checkbox"
        style={{ borderRadius: '50%', backgroundColor: '#34D399' }}
      />
            <label className='pl-4'>Recibir compra en mi domicilio</label></div>
            <p>Precio</p>
            </div>
            </div>
                <div className='flex justify-between  '>
                    <p>Direccion Guardada</p>
                    <p>Elegir otra o agregar</p></div>
                </div>
         <div className='flex mt-5 py-10 px-11 shadow-down w-full justify-between  items-center '>
          <div>
           <input type='checkbox'/>
            <label className='pl-4'>Retirar en sucursal del correo</label>
            </div>
            <p>Precio</p>
         </div>
      </section>

      <div className=' flex items-center justify-between px-[3%] py-[5%] text-3xl '>
       <p>Total Pagar</p>
       <p>${carritoData?.montoTotal}</p>
       </div>
       <div className='flex items-center flex-col gap-4 ' >
    <Link href={'/cart/confirm-purchase'}><button className='w-full md:w-[28rem] hover:scale-110 min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-pointer bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition'>Continuar</button></Link>
     <Link href={'/'}><button className='border-green-700 border w-full md:w-[28rem] hover:scale-110 relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg '>Cancelar</button></Link>
       </div>
    </div>
    </Layout>
  )
}
