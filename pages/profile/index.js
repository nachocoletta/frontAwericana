import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'

function profile () {
  const [perfil, setPerfil] = useState({ })

  const fetchPerfil = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/yo`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setPerfil({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          fechaNacimiento: data.fechaNacimiento,
          dni: data.dni
        })
      } else {
        console.error('Error al obtener los datos del perfil')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  useEffect(() => {
    fetchPerfil()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Mis Datos | Awericana</title>
      </Head>
      <Header disabled={true} />
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col'>
        <h1 className='py-12 px-4 font-normal text-lg leading-5'>Mis datos</h1>
        <div className='flex px-6 py-4 mb-2 justify-between shadow-md'>
          <div className='flex flex-col gap-2 font-light text-black text-sm leading-5'>
              <p>{`${perfil.nombre} ${perfil.apellido}`}</p>
              <p>{perfil.dni}</p>
              <p>{perfil.fechaNacimiento}</p>
          </div>
          <Link href={'profile/modify-data'} className='my-auto font-normal text-xs leading-5 underline'>
            Modificar
          </Link>
        </div>
        <div className='flex px-6 py-4 justify-between shadow-md'>
          <div className='flex flex-col gap-2 font-light text-black text-sm leading-5'>
              <p>{perfil.email}</p>
              <p>••••••••</p>
          </div>
          <Link href={'profile/modify-credentials'} className='my-auto font-normal text-xs leading-5 underline'>
            Modificar
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default profile
