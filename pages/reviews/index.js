/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
// import Link from 'next/link'
import { Layout } from '@/components/Layout'
import { AiOutlineStar } from 'react-icons/ai'
import { Submit } from '../../components/Buttons/Submit'
import { useSession } from '@/hooks/useSession'
export default function Index () {
  const [compras, setCompras] = useState([])
  const { session } = useSession()
  console.log(session)
  useEffect(() => {
    obtenerCompras()
  }, [])

  const obtenerCompras = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/7/compras`, {
        credentials: 'include'
      })
      const data = await response.json()
      setCompras(data)
    } catch (error) {
      console.error('Error al obtener las Compras:', error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    return true
  }

  return (
		<Layout>
		<Head>
        <title>Reviews</title>
		</Head>
		<Header />
		<section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col'>
			<h2 className='py-12 px-4 font-bold text-lg leading-5'>Calificar al vendedor</h2>
			<section className='flex'>
				<form onSubmit={handleSubmit}>
					<div className='flex justify-center gap-10'>
					<div>
						<p>Compraste</p>
						<div className='rounded-sm shadow-down'>
						{compras.map((publicacion, id) => {
						  return (
						<div key={id}>
								<div>
									<img src={publicacion.imagenPortada} alt='fotoProducto' />
								</div>
								<p>{publicacion.titulo}</p>
								<p>{publicacion.estadoEntrega}</p>
							</div>)
						})
						}
					</div>
					</div>

					<div>
						<p className='font-bold'>1. ¿Recibiste el producto que esperabas?</p>
						<div className='flex flex-col'>
							<div className='p-3'>
								<input type="radio" id="option1" name="radioGroup" value="option1" />
								<label htmlFor="option1">    Si</label>
							</div>
							<div className='p-3'>
								<input type="radio" id="option2" name="radioGroup" value="option2" />
								<label htmlFor="option2">    Si, pero no en las condiciones se especificaba</label>
							</div>
							<div className='p-3'>
								<input type="radio" id="option3" name="radioGroup" value="option3" />
								<label htmlFor="option3">    No</label>
							</div>
						</div>
						<p className='font-bold mt-2'>2. ¿Cómo calificarías al vendedor?</p>
						<div className='p-3'>
							<div className='flex ml-5' >
								<AiOutlineStar className='text-3xl text-green-600'/>
								<AiOutlineStar className='text-3xl text-green-600'/>
								<AiOutlineStar className='text-3xl text-green-600'/>
								<AiOutlineStar className='text-3xl text-green-600'/>
								<AiOutlineStar className='text-3xl text-green-600'/>
							</div>
							<div className='flex justify-between'>
								<span>Pésimo</span>
								<span>Excelente</span>
							</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center'>
					<div className='flex justify-center'>
							<Submit>ENVIAR</Submit>
					</div>
					<div className='flex justify-center'>
							<button className="border-green-700 border w-full md:w-[28rem]  relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg ">
							Cancelar
						</button>
					</div>
					</div>
				</form>
			</section>
		</section>
		<Footer />
		</Layout>
  )
}
