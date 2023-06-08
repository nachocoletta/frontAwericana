import { useState, useEffect } from 'react'
import { Input } from '@/components/Input'
import { Submit } from '@/components/Buttons/Submit'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { useError } from '@/hooks/useError'
import Head from 'next/head'
import { useMyPublications } from '@/hooks/useMyPublications'
import { Loading } from '@/components/Loading'

export default function Editar () {
  const [talles, setTalles] = useState([])
  const [, setFormData] = useState({})
  const { error, setError } = useError()
  const router = useRouter()
  const [previous, setPrevious] = useState()
  const { id } = router.query
  const { publications } = useMyPublications()

  useEffect(() => {
    if (publications) {
      const previous = publications.find(e => e.id === +id)
      if (!previous) router.push('/sell/my-products')
      else setPrevious(previous)
      console.log(previous)
    }
  }, [publications])

  useEffect(() => {
    localStorage.clear()
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/talle`)
      .then(response => response.json())
      .then(data => setTalles(data))
      .catch(error => console.log(error))
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const title = event.target.elements.title.value || previous.titulo
    const idTalle = event.target.elements.talle.value || previous.talleId.id
    const selectedTalle = talles.find(talle => talle.id === +idTalle)
    const detail = event.target.elements.detail.value || previous.descripcion
    const price = event.target.elements.price.value || previous.precio

    const newFormData = {
      title,
      selectedTalle,
      detail,
      price
    }

    if (title && selectedTalle && detail && price) {
      if (detail.length < 11 || detail.length > 99) {
        setError({ addProduct: 'La descripcion debe tener entre 10 y 100 caracteres' })
        return
      }
      setFormData(newFormData)
      localStorage.setItem('formData', JSON.stringify(newFormData))
      router.push(`/sell/edit-product/${id}/category`)
    } else {
      console.log(idTalle, selectedTalle)
      setError({ addProduct: 'Algo salio mal, revisa los campos nuevamente' })
    }
  }

  const handleCancel = () => {
    localStorage.clear()
    router.push('/')
  }

  if (!previous) {
    return (
    <Layout>
       <Head>
        <title>Agregar producto | Awericana</title>
      </Head>
      <Header disabled={true}/>
      <Loading />
    </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Agregar producto | Awericana</title>
      </Head>
      <Header disabled={true} />
      <h2 className='font-bold text-4xl mt-10 mb-10 ml-10'>Vender</h2>
      <section className='flex justify-center items-center flex-col p-layoutSides'>
        <form className='flex justify-center items-center flex-col ' onSubmit={handleFormSubmit}>
          <div>
            <Input type='text' placeholder={`Titulo. Anterior: ${previous.titulo}`} name='title' />
            <p>¿Qué vas a vender? Con este nombre aparecerá publicado tu producto</p>
            <select
              className='my-0.5 w-full h-12 border border-solid  text-gray-700 text-sm font-regular leading-tight border-green-700 text-black outline-none shadow-md p-3 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-400 focus:ring-opacity-50 placeholder:text-sm placeholder:text-slate-400'
              name='talle'
            >
              <option value={talles.find(talle => talle.id === previous.talleId)?.id}>{`Seleccionar talle. Anterior: ${talles.find(talle => talle.id === previous.talleId)?.nombre}`}</option>
              {talles.length > 0 && talles?.map(talle => (
                <option key={talle.id} value={talle.id}>{talle.nombre}</option>
              ))}
            </select>
            <p>Toma las medidas de tu producto, revisa nuestra tabla de talles y coloca el talle correspondiente a las medidas</p>
            <Input type='text' placeholder={`Detalle. Anterior: ${previous.descripcion}`} name='detail' />
            <p>Describe tu producto, acá deberás aclarar si tiene mucho uso, poco uso o es nuevo</p>
            <Input type='number' placeholder={`Precio. Anterior: ${previous.precio}`} name='price' />
            {error?.addProduct ? <p className='text-red text-big font-extrabold text-center'>{error?.addProduct}</p> : null}
           <div className='flex justify-center'><Submit className="flex justify-center">Guardar Y Continuar</Submit></div>
          </div>
        </form>
        <button className='border-green-700 border w-full md:w-[28rem]  relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg ' onClick={handleCancel}>Cancelar</button>
      </section>
      <Footer />
    </Layout>
  )
}
