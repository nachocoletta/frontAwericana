import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function index () {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    obtenerFavoritos()
  }, [])

  const obtenerFavoritos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favoritos`, {
        credentials: 'include'
      })
      const data = await response.json()
      const publicaciones = data.map((favorito) => favorito.publicacion)
      setFavoritos(publicaciones)
    } catch (error) {
      console.error('Error al obtener los favoritos:', error)
    }
  }

  const eliminarFavorito = async (favoritoId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favoritos/${favoritoId}`, {
        method: 'POST',
        credentials: 'include'
      })
      const nuevosFavoritos = favoritos.filter(
        (favorito) => favorito.id !== favoritoId
      )
      setFavoritos(nuevosFavoritos)
    } catch (error) {
      console.error('Error al eliminar el favorito:', error)
    }
  }

  return (
    <Layout>
        <Head>
        <title>Mis Favoritos</title>
      </Head>
      <Header />
      <h3 className='mt-16 ml-10 mb-8 text-4xl '>Mis Favoritos</h3>
      { favoritos.length > 0
        ? (
        <div className='flex flex-col gap-5 h-fit w-full m-auto max-w-[800px]'>
          {favoritos.map((publicacion) => (
            <div className='shadow-down' key={publicacion.id}>
              <div className='flex'>
                  <Image
                    width={90}
                    height={90}
                    alt='Imagen de producto'
                    className='w-[90px] h-[90px] mx-5 my-5'
                    src={publicacion.imagenPortada}
                  />
                <div className='flex flex-col justify-center'>
                  <p className='text-2xl'>{publicacion.titulo}</p>
                  <p className='text-xl'>${publicacion.precio}</p>
                </div>
              </div>
              <div className='flex justify-between text-primary text-lg px-5 py-5'>
                <Link className='hover:underline' href={'/detail/:id'} as={`/detail/${publicacion.id}`}>Ver Producto</Link>
                <p className='underline cursor-pointer' onClick={() => eliminarFavorito(publicacion.id)}>Quitar Favorito</p>
              </div>
            </div>
          ))}
        </div>
          )
        : (
        <p className='ml-10 text-2xl'>No hay favoritos disponibles</p>
          )}
    </Layout>
  )
}
