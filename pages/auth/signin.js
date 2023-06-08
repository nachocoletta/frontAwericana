import { Layout } from '@/components/Layout'
import { LoginForm } from '@/components/LoginForm'
import { Big } from '@/components/Logo/Big'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import img from '../../public/assets/gato.jpg'
export default function Signin () {
  return (
    <Layout>
       <Head>
        <title>Inicia Sesion</title>
      </Head>
      <header className='m-small'>
          <nav className='block m-auto w-fit'>
            <Link href={'/'}>
              <Big width={240} height={120}/>
            </Link>
          </nav>
      </header>

      <div className='lg:flex justify-center items-center w-full lg:p-8 lg:gap-20'>
        <Image src={img} width={450} height={550} alt='Gato' className='hidden lg:inline-block object-right-top mt-extra object-contain' />
        <section className="max-w-screen-sm p-8 lg:p-0 m-auto lg:m-0 flex-1 h-fit">
          <h1 className='mt-8 my-4 text-lg leading-tight sm:text-lg md:text-3xl self-center font-normal'>Inicio Sesion</h1>
          <div className='text-xs font-normal self-start md:text-sm mb-5'><p className='inline-block'>¿Aún no tienes cuenta?</p><Link href={'/auth/signup'} className='text-black ml-4 underline cursor-pointer'>Registrate</Link></div>
          <div className='flex justify-center w-full max-w-screen-md'>
            <LoginForm />
          </div>
        </section>
      </div>
    </Layout>
  )
}
