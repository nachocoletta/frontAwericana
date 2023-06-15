import { Layout } from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { Big } from '@/components/Logo/Big'
import img from '@/public/assets/error.png'

export default function FourOhFour () {
  return (
   <Layout>
   <Head>
        <title>Ups Error | Awericana</title>
      </Head>
      <header className='m-small'>
          <nav className='block m-auto w-fit'>
            <Link href={'/'}>
              <Big className='hover:scale-110' width={240} height={120}/>
            </Link>
          </nav>
      </header>
      <section className="flex justify-center items-center flex-wrap">
        <div><Image src={img} alt="logo404"/></div>
        <div><h4 className="text-2xl text-center">No pudimos encontrar la página que estas buscando</h4>
        </div>
      </section>
   </Layout>
  )
}
