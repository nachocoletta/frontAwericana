import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { AiOutlineStar } from 'react-icons/ai'
import { Submit } from '../../components/Buttons/Submit'
import { useSession } from '@/hooks/useSession'

export default function Index () {
  const [compras, setCompras] = useState([])
  const { session } = useSession()
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (session?.id) { obtenerCompras() }
  }, [session?.id])

  const obtenerCompras = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuario/${6}/compras`,
        {
          credentials: 'include'
        }
      )
      const data = await response.json()
      setCompras(data)
    } catch (error) {
      console.error('Error al obtener las Compras:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ puntaje: rating })
      })
      if (response.ok) {
        //
      } else {
        console.error('Error al enviar la calificación del vendedor')
      }
    } catch (error) {
      console.error('Error al enviar la calificación del vendedor:', error)
    }
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  return (
    <Layout>
      <Head>
        <title>Reviews | Awericana</title>
      </Head>
      <Header />
      <h2 className='mt-10 ml-10 mb-14 font-bold text-lg leading-5'>Calificar al vendedor</h2>
      <section className='max-w-screen-sm lg:max-w-5xl m-auto h-fit flex flex-col items-center'>
        <section className='flex'>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center gap-10'>
              <div>
                <p>Compraste</p>
                <div className='flex items-center rounded-sm shadow-down w-[459px] h-[200px]'>
                  {compras.map((publicacion, id) => {
                    return (
                      <div className='flex items-center' key={id}>
                        <div>
                          <img className='w-[128px] h-[152px]' src={publicacion.imagenPortada} alt='fotoProducto' />
                        </div>
                        <div>
                          <p>{publicacion.titulo}</p>
                          <p>{publicacion.estadoEntrega}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className='font-bold'>1. ¿Recibiste el producto que esperabas?</p>
                <div className='flex flex-col'>
                  <div className='p-3'>
                    <input type='radio' id='option1' name='radioGroup' value='option1' />
                    <label htmlFor='option1'>    Si</label>
                  </div>
                  <div className='p-3'>
                    <input type='radio' id='option2' name='radioGroup' value='option2' />
                    <label htmlFor='option2'>    Si, pero no en las condiciones se especificaba</label>
                  </div>
                  <div className='p-3'>
                    <input type='radio' id='option3' name='radioGroup' value='option3' />
                    <label htmlFor='option3'>    No</label>
                  </div>
                </div>
                <p className='font-bold mt-2'>2. ¿Cómo calificarías al vendedor?</p>
                <div className='p-3'>
                  <div className='flex ml-12'>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <AiOutlineStar
                        key={value}
                        className={`text-3xl text-green-600 cursor-pointer ${value <= rating ? 'text-green-900' : ''}`}
                        onClick={() => handleRatingChange(value)}
                      />
                    ))}
                  </div>
                  <div className='flex'>
                    <span>Pésimo</span>
                    <span className='ml-36'>Excelente</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <Submit>ENVIAR</Submit>
              </div>
              <div className='flex justify-center'>
                <button className='border-green-700 hover:scale-110 border w-full md:w-[28rem]  relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg '>
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
