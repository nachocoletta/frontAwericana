import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { useSession } from '@/hooks/useSession'
import { BiTrash } from 'react-icons/bi'
import Link from 'next/link'
import Head from 'next/head'

export default function Index () {
  const [carritoData, setCarritoData] = useState(null)
  const { session } = useSession()

  useEffect(() => {
    const fetchCarritoData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, {
          credentials: 'include'
        })
        const data = await response.json()
        setCarritoData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCarritoData()
  }, [])

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicacionId: itemId })
      })

      const itemIndex = carritoData.carrito.findIndex((item) => item.publicacion.id === itemId)
      if (itemIndex !== -1) {
        const updatedCarritoData = [...carritoData.carrito]
        updatedCarritoData.splice(itemIndex, 1)
        setCarritoData({ ...carritoData, carrito: updatedCarritoData })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mi Carrito</title>
      </Head>
      <Header />

      <div className="px-[10%]">
        <h3 className="mt-20 mb-5 text-3xl">Producto</h3>
        <section>
          {carritoData?.carrito && carritoData.carrito.length > 0
            ? (
            <div className="">
              {carritoData.carrito.map((item) => (
                <div
                  className="flex mt-5 py-4 px-11 shadow-down w-full justify-between items-center h-[160px]"
                  key={item.publicacion.id}
                >
                  <div className="flex items-center">
                    <img
                      className="w-[112px] h-[112px]"
                      src={item.publicacion.imagenPortada}
                      alt={item.publicacion.titulo}
                    />
                    <div className="pl-4">
                      <p className="text-2xl">{item.publicacion.titulo}</p>
                      <p className="text-1xl">{item.publicacion.talleId}</p>
                      <a>Ver Producto</a>
                    </div>
                  </div>
                  <p className="text-1xl" onClick={() => handleDeleteItem(item.publicacion.id)}>
                    <BiTrash className="cursor-pointer" />
                  </p>
                </div>
              ))}
            </div>
              )
            : (
            <p>No hay productos en el carrito</p>
              )}
        </section>

        <div className="flex items-center flex-col gap-4 mt-7 ">
          {carritoData?.carrito && carritoData.carrito.length > 0
            ? (
            <Link href="/cart/delivery">
              <button className="w-full  md:w-[28rem] hover:scale-110 min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-pointer bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition">
                Comprar Carrito
              </button>
            </Link>
              )
            : (
            <button
              className="w-full md:w-[28rem]  min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-pointer bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition"
              disabled
            >
              Comprar Carrito
            </button>
              )}
        <Link href="/"> <button className="border-green-700 hover:scale-110 border w-full md:w-[28rem] relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg">
            Cancelar
          </button></Link>
        </div>
      </div>
    </Layout>
  )
}
