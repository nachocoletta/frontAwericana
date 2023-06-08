import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'

function Sell () {
  return (
    <Layout>
      <Head>
        <title>Ventas | Awericana</title>
      </Head>
      <Header disabled={true}/>
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col'>
      <h1 className='py-12 px-4 font-normal text-lg leading-5'>Vender</h1>
      <div className='flex px-6 py-4 mb-2 shadow-md min-h-[80px]'>
        <Link href={'sell/my-products'} className='my-auto font-light text-sm leading-5 hover:underline'>
          Ver mis productos
        </Link>
      </div>
      <div className='flex px-6 py-4 mb-2 shadow-md min-h-[80px]'>
        <Link href={'sell/add-product'} className='my-auto font-light text-sm leading-5 hover:underline'>
          Agregar nuevo producto
        </Link>
      </div>
      </section>
    </Layout>
  )
}

export default Sell
