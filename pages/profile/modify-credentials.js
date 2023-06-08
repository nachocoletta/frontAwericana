import { Submit } from '@/components/Buttons/Submit'
import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import Head from 'next/head'

function modifyCredentials () {
  return (
    <Layout>
      <Head>
        <title>Mis Datos 2</title>
      </Head>
      <Header disabled={true} />
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit'>
        <h1 className='py-12 px-4 font-normal text-lg leading-5'>Mis datos</h1>
        <Form>
          <div className='flex flex-col gap-6'>
            <Input label='Email' placeholder='Email' />
            <Input label='Contraseña' placeholder='Contraseña' />
            <Input label='Repetir contraseña' placeholder='Repetir contraseña' />
          </div>
          <Submit center={true}>GUARDAR CAMBIOS</Submit>
        </Form>
      </section>
    </Layout>
  )
}

export default modifyCredentials
