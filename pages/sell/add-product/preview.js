import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Submit } from '@/components/Buttons/Submit'
import { Tertiary } from '@/components/Buttons/Tertiary'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import { Post } from '@/components/Post'
import { useProduct } from '@/hooks/useProduct'
import { useError } from '@/hooks/useError'
import { useMyPublications } from '@/hooks/useMyPublications'
import Head from 'next/head'

export default function Preview () {
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { error, setError } = useError({})
  const { push } = useRouter()
  const { createPost, sellerData } = useProduct()
  const { dispatch, ACTION_TYPES } = useMyPublications()

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      setFormData(parsedFormData)
    } else {
      push('/sell')
    }
  }, [])

  const handleCancel = () => {
    localStorage.clear()
    push('/sell')
  }

  const handleSubmit = () => {
    if (Object.keys(formData).length >= 8) { // Si esta completo el objeto con la info...
      setIsLoading(true)

      createPost(formData)
        .then(res => {
          if (res.ok) {
            setIsLoading(false)
            return res.json()
          }
        })
        .then(res => {
          dispatch({ type: ACTION_TYPES.ADD_ONE, payload: res.publicacion })
          push('/sell/my-products')
        })
        .catch(err => {
          setIsLoading(false)
          setError({ preview: 'Algo salió mal, reintentalo o repite el proceso.' })
          console.error(err)
        })
    } else {
      setError({ preview: 'Algo salió mal, reintentalo o repite el proceso.' })
    }
  }

  return (
    <Layout>
      <Header disabled={true} />
      <h2 className='mt-14 ml-8 text-4xl'>Vista Previa</h2>
      <Head>
        <title>Agregar producto | Awericana</title>
      </Head>
      {formData
        ? (
        <section className='flex flex-col m-auto max-w-[500px] lg:w-full lg:max-w-none justify-center items-center gap-10 mt-14'>
          <Post buttons={false} {...formData} sellerData={sellerData} />
        </section>
          )
        : null}

      <div className='flex justify-center items-center flex-col mt-10 '>
        {error?.preview ? <p className='text-red text-big font-extrabold text-center'>{error.preview}</p> : null}
        <Submit isLoading={isLoading} center={true} onClick={handleSubmit}>Publicar</Submit>
        <Tertiary center={true} onClick={handleCancel}>Cancelar</Tertiary>
      </div>
      <Footer />
    </Layout>
  )
}
