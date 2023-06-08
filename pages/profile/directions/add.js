import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { Submit } from '../../../components/Buttons/Submit'
import { Footer } from '@/components/Footer'
import { Layout } from '@/components/Layout'
import Head from 'next/head'
import { useSession } from '@/hooks/useSession'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function add () {
  const router = useRouter()
  const { session } = useSession()
  const [direccion, setDireccion] = useState({
    calle: '',
    numeracion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    pais: ''
  })
  const [paises, setPaises] = useState([])

  useEffect(() => {
    fetchPaises()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const incompleteFields = Object.entries(direccion).filter(([key, value]) => {
      return key !== 'pais' && (value === '' || value === undefined)
    })

    if (incompleteFields.length > 0) {
      alert('Por favor, complete todos los campos obligatorios.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/direcciones/?idUsuario=${session.id}`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calle: direccion?.calle,
          numeracion: direccion?.numeracion,
          codigoPostal: direccion?.codigoPostal,
          ciudad: direccion?.ciudad,
          provincia: direccion?.provincia,
          idPais: parseInt(direccion?.pais)
        })
      })

      if (response.ok) {
        router.push('/profile/directions')
      } else {
        console.error('Error al agregar la dirección')
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Agregar Dirección</title>
      </Head>
      <Header disabled={true} />

      <section className="flex flex-col justify-center items-center">
        <p className="mt-[70px] mb-[50px] font-medium text-3xl">Agregar Dirección</p>
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
          <div className="ml-4 mr-4 mt-5 flex flex-col gap-3">
            <Input
              name={'Calle'}
              type="text"
              placeholder={'Calle*'}
              label={'Calle*'}
              value={direccion.calle}
              onChange={(e) => setDireccion({ ...direccion, calle: e.target.value })}
            />
            <div className="flex gap-5 justify-center items-center w-full">
              <Input
                name={'Numero'}
                type="text"

                placeholder={'Numero*'}
                label={'Numero*'}
                value={direccion.numeracion}
                onChange={(e) => setDireccion({ ...direccion, numeracion: e.target.value })}
              />
              <Input
                name={'C.Postal'}
                type="text"
                placeholder={'C.Postal*'}
                label={'C.Postal*'}
                value={direccion.codigoPostal}
                onChange={(e) => setDireccion({ ...direccion, codigoPostal: e.target.value })}
              />
            </div>
            <Input
              name={'Ciudad'}
              type={'text'}
              placeholder={'Ciudad*'}
              label={'Ciudad*'}
              value={direccion.ciudad}
              onChange={(e) => setDireccion({ ...direccion, ciudad: e.target.value })}
            />
            <Input
              name={'Provincia'}
              type={'text'}
              placeholder={'Provincia*'}
              label={'Provincia*'}
              value={direccion.provincia}
              onChange={(e) => setDireccion({ ...direccion, provincia: e.target.value })}
            />
            <select
              name={'Pais'}
              value={direccion.pais}
              onChange={(e) => setDireccion({ ...direccion, pais: e.target.value })}
              className='my-0.5 w-full h-12 border border-solid  text-gray-700 text-sm font-regular leading-tight border-green-700 text-black outline-none shadow-md p-3 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400'
            >
              <option className="" value="">
                Seleccione un país*
              </option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
              ))}
            </select>
          </div>
          <Submit>Agregar</Submit>
          <Link href={'/profile/directions'} ><button className='w-[390px] hover:scale-110 border my-0.5  h-12  border-solid  text-gray-700 text-sm font-regular leading-tight text-black outline-none shadow-md p-3 rounded-xl border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm border-green-400`'>
            Cancelar
          </button></Link>
        </form>
      </section>
      <Footer />
    </Layout>
  )
}
