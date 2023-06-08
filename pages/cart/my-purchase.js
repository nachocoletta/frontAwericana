import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { useSession } from '@/hooks/useSession'
import Head from 'next/head'

export default function index () {
  const [compras, setCompras] = useState([])
  const { session } = useSession()
  console.log(session)
  useEffect(() => {
    obtenerCompras()
  }, [])

  const obtenerCompras = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/${session?.id}/compras`, {
        credentials: 'include'
      })
      const data = await response.json()
      setCompras(data)
    } catch (error) {
      console.error('Error al obtener las Compras:', error)
    }
  }

  return (
    <Layout>
        <Head>
        <title>Mis Compras</title>
      </Head>
      <Header />
      <h3 className='mt-16 ml-10 mb-8 text-4xl '>Mis Compras</h3>
      { compras.length > 0
        ? (
        <div className=' mr-10 ml-10 flex flex-col gap-5'>
          {compras.map((publicacion) => (
            <div className='shadow-down' key={publicacion.id}>
              <div className='flex'>
                <div>
                  <img
                    className='w-[90px] h-[90px] mx-5 my-5'
                    src={publicacion.imagenPortada}
                  />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-3xl'>{publicacion.titulo}</p>
                  <p className='text-2xl'>{publicacion.estado}</p>
                  <p className='text-2xl'>{publicacion.estadoEntrega}</p>
                </div>
              </div>
              <div className='flex justify-between  px-16 py-5'>
                <a className='underline cursor-pointer' >Ver Producto</a>
                <a className='underline cursor-pointer'>Estado del Envio</a>
              </div>
            </div>
          ))}
        </div>
          )
        : (
        <p className='ml-10 text-2xl'>No hay Compras disponibles</p>
          )}
    </Layout>
  )
}
