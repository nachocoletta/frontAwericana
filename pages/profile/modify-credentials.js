import { useState, useEffect } from 'react'
import { Submit } from '@/components/Buttons/Submit'
import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'

function modifyCredentials () {
  const router = useRouter()
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const fetchCredenciales = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/yo`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setCredenciales({
          email: data.email,
          password: data.password
        })
      } else {
        console.error('Error al obtener las credenciales')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  useEffect(() => {
    fetchCredenciales()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* const completedFields = Object.values(direccion).filter((value) => value.trim() !== '').length
    if (completedFields < 6) {
      alert('Por favor, complete  6 campos.')
      return
    } */
    const email = (credenciales.email).trim(); if (email === '') { return }
    const password = (credenciales.password).trim(); if (password === '') { return }
    if (password !== credenciales.password2) { return }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/newPassword`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if (response.ok) {
        console.log('Credenciales modificadas')
        router.push('/profile')
      } else {
        console.error('Error al modificar las credenciales')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mis Datos | Awericana</title>
      </Head>
      <Header disabled={true} />
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit'>
        <h1 className='py-12 px-4 font-normal text-lg leading-5'>Mis datos</h1>
        <Form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6'>
            <Input
              name= 'Email'
              type='text'
              placeholder='Email'
              label='Email'
              value={credenciales.email} onChange={(e) => setCredenciales({ ...credenciales, email: (e.target.value).trimStart() })}
            />
            <Input
              name= 'Password'
              type='text'
              placeholder='Contraseña'
              label='Contraseña'
              value={credenciales.password} onChange={(e) => setCredenciales({ ...credenciales, password: (e.target.value).trimStart() })}
            />
            <Input
              name= 'Password2'
              type='text'
              placeholder='Contraseña'
              label='Repetir contraseña'
              value={credenciales.password2} onChange={(e) => setCredenciales({ ...credenciales, password2: (e.target.value).trimStart() })}
            />
          </div>
          <Submit center={true}>GUARDAR CAMBIOS</Submit>
        </Form>
      </section>
    </Layout>
  )
}

export default modifyCredentials
