import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Submit } from '@/components/Buttons/Submit'
import Head from 'next/head'

export default function paymentPonfirmed () {
  return (
    <Layout>
       <Head>
        <title>Mi Carrito</title>
      </Head>
        <Header/>
    <h3 className='mt-14 mr-11 text-3xl ml-14'>Pago Realizado</h3>
    <div className='w-screen flex justify-center items-center '> <AiFillCheckCircle className='w-[300px] h-[400px] text-green-900'/></div>
    <div className='w-screen flex justify-center items-center '><Submit >VER COMPRA</Submit></div>
    </Layout>
  )
}
