import { getPostById } from '@/lib/getPostById'
import { Post } from '@/components/Post'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { useEffect, useState } from 'react'
import { ErrorLayout } from '@/components/ErrorLayout'
import { useSession } from '@/hooks/useSession'
import { Loading } from '@/components/Loading'
import Head from 'next/head'

export default function Detail ({ postData = {} }) {
  const [data, setData] = useState({})
  const [images, setImages] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [sellerData, setSellerData] = useState({})
  const [initialFav, setInitialFav] = useState(null)
  const { session, setSession } = useSession()

  useEffect(() => {
    if (!session?.id) {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/loginLocal/success`
      fetch(URL, { credentials: 'include' })
        .then(res => res.ok ? res.json() : res)
        .then(res => setSession(res.user))
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    if (postData.usuarioId && initialFav === null) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/favoritos/${postData.id}`, { credentials: 'include' })
        .then(res => {
          if (res.ok) return res.json()
          return res
        })
        .then(res => {
          console.log(res)
          setInitialFav(res?.enFavoritos ? true : false)
        })
        .catch(e => {
          console.error(e)
          setInitialFav(false)
        })
    }
  }, [session?.id])

  useEffect(() => {
    if (postData?.id) {
      setData(postData)
      const imagesData = postData.imagens?.filter(img => img.link.length > 2).map(img => img.link)
      setImages(imagesData)

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/${postData.usuarioId}`)
        .then(res => res.ok ? res.json() : res)
        .then(setSellerData)
        .catch(console.error)
    } else if (postData === null) {
      setNotFound(true)
    }
  }, [postData])

  if (notFound) {
    return (
    <Layout>
      <Header disabled={true}/>
      <Head>
        <title>Error | Awericana</title>
      </Head>
      <ErrorLayout/>
    </Layout>
    )
  } else {
    console.log('fav', initialFav)
    return (
    <Layout>
      <Header disabled={true}/>
      <Head>
        <title>Detalle | Awericana</title>
      </Head>
      { data && images.length > 0 && initialFav !== null
        ? <Post buttons={true} initialFav={initialFav} id={postData.id} title={data.titulo} price={data.precio} userId={session?.id} ownProduct={postData.usuarioId === session?.id} originalPrice={data.precioOriginal || data.precio} imageUrls={images} detail={data.descripcion} selectedTalle={{ nombre: 'XL' }} sellerData={sellerData} />
        : (
        <div className='mt-20'>
          <Loading />

        </div>
          )
    }
<h3 className='text-3xl ml-10 mt-20 mb-10'>Mas Productos Del Vendedor</h3>
<div className='flex gap-10 pl-10 pt-5 flex-row '>
  {images.map((e, index) => (
    <div className='' key={index}>
      <img className='w-[120px] hover:scale-110 cursor-pointer h-[120px]' src={e} alt="Imagen" />
    </div>
  ))}
</div>

    </Layout>
    )
  }
}

export async function getServerSideProps ({ params }) {
  const { id } = params
  try {
    const postData = await getPostById(id)
    return {
      props: {
        postData
      }
    }
  } catch (e) {
    return {
      props: {
        postData: e
      }
    }
  }
}
