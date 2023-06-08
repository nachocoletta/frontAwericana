import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import Head from 'next/head'
import Banner from '@/components/Banner'
import Card from '@/components/Card'
import Categories from '@/components/Category/Categories'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearch } from '@/hooks/useSearch'

export default function Home ({ publicaciones = [], talles = [] }) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)
  const { url, add } = useSearch()
  const [shown, setShown] = useState(publicaciones)
  console.log(talles)

  useEffect(() => {
    console.log(url)
    add('termino', debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    fetch(url)
      .then(res => res.ok ? res.json() : res)
      .then(res => {
        if (res.coincidencias > 0) setShown(res.publicaciones)
        else setShown(publicaciones)
      })
  }, [url])

  return (
    <Layout>
      <Head>
        <title>Inicio | Awericana</title>
      </Head>
   <Header>
      <nav className={'flex-1 mx-small max-w-[768px] cursor-default'}>
          <div className="relative">
            <input
              className={'border w-full text-black md:h-[50px] min-w-[150px] h-[38px] text-sm outline-none shadow-md p-3 rounded-xl focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400 border-primary pr-0'}
              type="search"
              placeholder="Buscar"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
              <FaSearch className={'fill-primary'}/>
            </span>
          </div>
        </nav>
      </Header>

      {!debouncedValue
        ? <>
      <Banner />
        <div className="p-4">
          <section>
            <Categories />
          </section>
          <h1 className='text-2xl font-semibold ml-5 mt-10'>Productos destacados</h1>
          <section className='flex flex-wrap justify-center gap-4'>
            {publicaciones.length > 0 && publicaciones.map(pub => {
              return (
                <Link href={'/detail/:id'} as={`/detail/${pub.id}`} key={pub.id}>
                  <Card
                    precio={pub.precio}
                    titulo={pub.titulo}
                    talleMedidas={pub.talle.nombre}
                    imgSrc={pub.imagenPortada || null}
                    precioOriginal={pub.precioOriginal}
                    descuento={pub.descuento}
                    />
                </Link>
              )
            })}
          </section>
        </div>
        </>
        : shown.length > 0 && (
          <section className='flex flex-wrap justify-center gap-4 m-auto w-full p-4'>
            {shown.map(pub => {
              return (
                <Link href={'/detail/:id'} as={`/detail/${pub.id}`} key={pub.id}>
                    <Card
                      precio={pub.precio}
                      titulo={pub.titulo}
                      talleMedidas={talles.find(el => el.id === pub.talleId).nombre}
                      imgSrc={pub.imagenPortada || null}
                      precioOriginal={pub.precioOriginal}
                      descuento={pub.descuento}
                      />
                  </Link>
              )
            })}
          </section>
        )}
    </Layout>
  )
}

export async function getServerSideProps (ctx) {
  const publicacionesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones?offset=0&limit=100`)
  const tallesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/talle`)
  const publicaciones = await publicacionesResponse.json()
  const talles = await tallesResponse.json()

  return {
    props: {
      publicaciones: publicaciones.publicaciones,
      talles
    }
  }
}
