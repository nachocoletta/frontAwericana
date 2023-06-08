import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { useSession } from '@/hooks/useSession'
import Head from 'next/head'
export default function Index () {
  const [carritoData, setCarritoData] = useState(null)
  const { session } = useSession()

  useEffect(() => {
    const fetchCarritoData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/carrito/${session?.id}`, {
            credentials: 'include'
          }
        )
        const data = await response.json()
        setCarritoData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCarritoData()
  }, [])

  const pagarConMercadoPago = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pagos/url/${session?.id}`,
        { credentials: 'include' }
      )
      const data = await response.text()
      window.location.href = data
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
          {carritoData?.carrito && (
            <div className="">
              {carritoData.carrito.map((item) => (
                <div
                  className="flex mt-5 py-4 px-11 shadow-down w-full justify-between items-center h-[160px]"
                  key={item.publicacion.id}
                >
                  <div className="flex items-center ">
                    <img
                      className="w-[112px] h-[112px]"
                      src={item.publicacion.imagenPortada}
                    />
                    <div className="pl-4">
                      <p className="text-2xl">{item.publicacion.titulo}</p>
                      <p className="text-1xl">{item.publicacion.talleId}</p>
                    </div>
                  </div>
                  <p className="text-1xl"> Arg ${item.publicacion.precio}</p>
                </div>
              ))}
            </div>
          )}
        </section>
        <h3 className="mt-8 mb-8 text-3xl">Envio</h3>

        <div className=" flex items-center justify-between px-[3%] py-[5%] text-3xl ">
          <p>Total Pagar</p>
          <p>${carritoData?.montoTotal}</p>
        </div>
        <div className="flex items-center flex-col gap-4 ">
        <button
            className="w-full md:w-[28rem] min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-pointer bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition"
            onClick={pagarConMercadoPago}
          >
            PAGAR CON MERCADO PAGO
          </button>
          <button className="border-green-700 border hover:scale-110 w-full md:w-[28rem]  relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg ">
            Cancelar
          </button>
        </div>
      </div>
    </Layout>
  )
}
