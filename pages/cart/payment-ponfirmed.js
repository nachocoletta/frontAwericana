import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Submit } from '@/components/Buttons/Submit'
import Head from 'next/head'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function paymentPonfirmed () {
  const { setSession, session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.id) {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/loginLocal/success`
      fetch(URL, { credentials: 'include' })
        .then(res => res.ok ? res.json() : res)
        .then(res => setSession(res.user))
        .catch(console.error)
    }
  }, [])

  return (
    <Layout>
       <Head>
        <title>Mi Carrito | Awericana</title>
      </Head>
        <Header disabled={true}/>

    <h3 className='mt-14 mr-11 text-3xl ml-14'>Pago Realizado</h3>
    <div className='w-screen flex justify-center items-center'> <AiFillCheckCircle className='w-[300px] h-[400px] text-green-900'/></div>
    <div className='w-screen flex justify-center items-center'><Submit onClick={() => router.push('/cart/my-purchase')}>VER COMPRA</Submit></div>
    </Layout>
  )
}
