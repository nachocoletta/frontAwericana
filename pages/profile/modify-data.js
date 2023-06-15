import { useState, useEffect } from 'react'
import { Submit } from '@/components/Buttons/Submit'
import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'

function personalData () {
  const router = useRouter()
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    dni: ''
  })

  const fetchDatos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/yo`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setDatos({
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
          dni: data.dni
        })
      } else {
        console.error('Error al obtener los datos del perfil')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  useEffect(() => {
    fetchDatos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* const completedFields = Object.values(direccion).filter((value) => value.trim() !== '').length
    if (completedFields < 6) {
      alert('Por favor, complete  6 campos.')
      return
    } */
    const nombre = (datos.nombre).trim(); if (nombre === '') { return }
    const apellido = (datos.apellido).trim(); if (apellido === '') { return }
    const dni = datos.dni; if (dni === '' || dni === 0) { return }
    const fechaNacimiento = datos.fechaNacimiento; if (fechaNacimiento === '') { return }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          fechaNacimiento
        })
      })
      console.log('responseOk:', response.ok)
      if (response.ok) {
        console.log('Datos modificados')
        router.push('/profile')
      } else {
        console.error('Error al modificar los datos')
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
             name= 'Nombre'
              type='text'
             placeholder='Nombre'
             label='Nombre'
              value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: (e.target.value).trimStart() })}
            />
            <Input
              name= 'Apellido'
              type='text'
              placeholder='Apellido'
              label='Apellido'
              value={datos.apellido} onChange={(e) => setDatos({ ...datos, apellido: (e.target.value).trimStart() })}
            />
            <Input
              name= 'DNI'
              type='text'
              placeholder='DNI'
              label='DNI'
              value={datos.dni} onChange={(e) => setDatos({ ...datos, dni: (e.target.value).trimStart() })}
            />
            <Input
              name= 'FechaNacimiento'
              type="date"
              placeholder='Fecha de nacimiento'
              label='Fecha de Nacimiento'
              value={datos.fechaNacimiento} onChange={(e) => setDatos({ ...datos, fechaNacimiento: e.target.value })}
            />
          </div>
          <Submit center={true}>GUARDAR CAMBIOS</Submit>
        </Form>
      </section>
    </Layout>
  )
}

export default personalData
