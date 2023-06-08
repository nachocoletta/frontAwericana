import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Submit } from '@/components/Buttons/Submit'
import { Footer } from '@/components/Footer'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function add () {
  const router = useRouter()
  const { id } = router.query
  const [paises, setPaises] = useState([])
  const [direccion, setDireccion] = useState({
    calle: '',
    numeracion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    idPais: ''
  })

  const fetchPaises = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paises`)
      if (response.ok) {
        const data = await response.json()
        setPaises(data)
      } else {
        console.error('Error al obtener los países')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  const fetchDireccion = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/direcciones/${id}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setDireccion({
          calle: data.calle,
          numeracion: data.numeracion,
          codigoPostal: data.codigoPostal,
          ciudad: data.ciudad,
          provincia: data.provincia,
          idPais: data.paiId
        })
      } else {
        console.error('Error al obtener los datos de la dirección')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  useEffect(() => {
    fetchPaises()
    fetchDireccion()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* const completedFields = Object.values(direccion).filter((value) => value.trim() !== '').length
    if (completedFields < 6) {
      alert('Por favor, complete  6 campos.')
      return
    } */
    const calle = (direccion.calle).trim(); if (calle === '') { return }
    const numeracion = (direccion.numeracion).trim(); if (numeracion === '') { return }
    const codigoPostal = (direccion.codigoPostal).trim(); if (codigoPostal === '') { return }
    const ciudad = (direccion.ciudad).trim(); if (ciudad === '') { return }
    const provincia = (direccion.provincia).trim(); if (provincia === '') { return }
    const idPais = direccion.idPais; if (+idPais === 0) { return }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/direcciones/${id}`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calle,
          numeracion,
          codigoPostal,
          ciudad,
          provincia,
          idPais
        })
      })
      if (response.ok) {
        console.log('Dirección modificada')
        router.push('/profile/directions')
      } else {
        console.error('Error al modificar la dirección')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Modificar Dirección</title>
      </Head>
      <Header disabled={true} />
      <section className='flex flex-col justify-center items-center'>
        <p className='mt-[70px] mb-[50px] font-medium text-3xl'>Modificar Dirección</p>
        <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
          <div className='ml-4 mr-4 mt-5 flex flex-col gap-3'>
            <Input
              name={'Calle'}
              type='text'
              placeholder={'Calle*'}
              label={'Calle*'}
              value={direccion.calle}
              onChange={(e) => setDireccion({ ...direccion, calle: (e.target.value).trimStart() })}
            />
            <div className='flex gap-5 justify-center items-center w-full'>
              <Input
                name={'Numero'}
                type='text'
                placeholder={'Numero*'}
                label={'Numero*'}
                value={direccion.numeracion}
                onChange={(e) => setDireccion({ ...direccion, numeracion: (e.target.value).trimStart() })}
              />
              <Input
                name={'C.Postal'}
                type='Number'
                placeholder={'C.Postal*'}
                label={'C.Postal*'}
                value={direccion.codigoPostal}
                onChange={(e) => setDireccion({ ...direccion, codigoPostal: (e.target.value).trimStart() })}
              />
            </div>
            <Input
              name={'Ciudad'}
              type={'text'}
              placeholder={'Ciudad*'}
              label={'Ciudad*'}
              value={direccion.ciudad}
              onChange={(e) => setDireccion({ ...direccion, ciudad: (e.target.value).trimStart() })}
            />
            <Input
              name={'Provincia'}
              type={'text'}
              placeholder={'Provincia*'}
              label={'Provincia*'}
              value={direccion.provincia}
              onChange={(e) => setDireccion({ ...direccion, provincia: (e.target.value).trimStart() })}
            />
            <select
                 name={'Pais'}
                 value={direccion.idPais}
                 onChange={(e) => setDireccion({ ...direccion, idPais: e.target.value })}
                 className='my-0.5 w-full h-12 border border-solid  text-gray-700 text-sm font-regular leading-tight border-green-700 text-black outline-none shadow-md p-3 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400'
                 >
                  <option className="" value="" disabled>
                      Seleccione un país*
                  </option>
                   {paises.map((pais) => (

                     <option key={pais.id} value={pais.id}>

                   {pais.nombre}
                </option>))}
                </select>
          </div>
          <Submit>Guardar Cambios</Submit>
          <Link href={'/profile/directions'} ><button className='w-[390px] hover:scale-110 border my-0.5  h-12  border-solid  text-gray-700 text-sm font-regular leading-tight text-black outline-none shadow-md p-3 rounded-xl border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm border-green-400`'>
            Cancelar
          </button></Link>
        </form>
      </section>
      <Footer />
    </Layout>
  )
}
