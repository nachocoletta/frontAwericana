import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '@/components/Layout'

export default function Direccion () {
  const [direcciones, setDirecciones] = useState([])
  useEffect(() => {
    async function fetchDirecciones () {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/direcciones`, {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setDirecciones(data)
        } else {
          console.error('Error al obtener las direcciones')
        }
      } catch (error) {
        console.error('Error al realizar la solicitud', error)
      }
    }

    fetchDirecciones()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Mis Direcciones</title>
      </Head>
      <Header />
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col'>
        <h1 className='py-12 px-4 font-normal text-lg leading-5'>Mis Direcciones</h1>
        { direcciones.length > 0
          ? (
              direcciones.map((direccion) => (
            <div key={direccion.id} className='flex px-6 py-4 mb-2 justify-between shadow-md'>
              <div className='flex flex-col gap-2 font-light text-black text-sm leading-5'>
                <p>{direccion.calle}</p>
                <p>{direccion.codigoPostal}</p>
              </div>
              <Link href={'/profile/directions/edit/[id]'} as={`/profile/directions/edit/${direccion.id}`} className='my-auto font-normal text-xs leading-5 underline'>
                Modificar
              </Link>
            </div>
              ))
            )
          : (
          <p>No hay direcciones cargadas.</p>
            )}
        <div className='flex px-6 py-4 justify-between shadow-md'>
          <div className='flex flex-col gap-2 font-light text-black text-sm leading-5'>
            <p>Agregar otra dirección</p>
          </div>
          <Link href='/profile/directions/add' className='my-auto font-normal text-xs leading-5 underline'>
            Agregar Dirección
          </Link>
        </div>
      </section>
      <Footer />
    </Layout>
  )
}
