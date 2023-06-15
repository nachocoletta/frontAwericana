import { Layout } from '@/components/Layout'
import { SignupForm } from '@/components/SignupForm'
import { Big } from '@/components/Logo/Big'
import Link from 'next/link'
import Head from 'next/head'
function Signup () {
  return (
    <Layout>
      <Head>
        <title>Registrate | Awericana</title>
      </Head>
      <header className='m-small'>
          <nav className='block m-auto w-fit'>
            <Link href={'/'}>
              <Big width={240} height={120}/>
            </Link>
          </nav>
      </header>
      <section className='max-w-screen-sm lg:max-w-5xl m-auto flex flex-col h-fit items-center p-8'>
        <h1 className='my-4 text-lg leading-tight sm:text-lg md:text-3xl self-start font-normal'>Registrate</h1>
        <p className='text-xs font-normal self-start md:text-sm mb-5'>Completa los siguientes datos:</p>
        <SignupForm />
      </section>
    </Layout>
  )
}

export default Signup
