import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import MyProductsCard from '@/components/MyProductsCard'
import Head from 'next/head'
import { useMyPublications } from '@/hooks/useMyPublications'
import { useProduct } from '@/hooks/useProduct'
import { Loading } from '@/components/Loading'
import { useState } from 'react'

export default function MyProducts () {
  const [isLocalLoading, setIsLocalLoading] = useState(false)
  const { publications, dispatch, ACTION_TYPES, isLoading } = useMyPublications()
  const { deletePostById, applyDiscount } = useProduct()

  const handleDelete = async (id) => {
    setIsLocalLoading(true)
    const isDeleted = await deletePostById(id)
    if (isDeleted) dispatch({ type: ACTION_TYPES.DELETE_ID, payload: id })
    setIsLocalLoading(false)
  }

  const handleDiscount = (publication) => {
    dispatch({ type: ACTION_TYPES.UPDATE_ONE, payload: publication })
  }

  return (
    <Layout>
      <Head>
        <title>Mis productos | Awericana</title>
      </Head>
      <Header disabled={true}/>
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col'>
      <h1 className='py-12 px-4 font-normal text-lg leading-5 xl:text-3xl xl:leading-loose'>Mis productos</h1>
      {!isLoading && !isLocalLoading
        ? publications.map(pub => {
          return <MyProductsCard key={pub.id} id={pub.id} title={pub.titulo} price={pub.precioOriginal || pub.precio} discount={pub.descuento} discountPrice={pub.precio} applyDiscount={applyDiscount} handleDiscount={handleDiscount} handleDelete={handleDelete} imgUrl={pub.imagenPortada}/>
        })
        : <Loading />}
        {
          !isLoading && !isLoading && publications.length === 0 && <p className='text-3xl ml-10'>Aún no hay publicaciones.</p>
        }
      </section>
    </Layout>
  )
}
