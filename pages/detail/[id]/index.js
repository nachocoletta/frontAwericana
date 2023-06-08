import { getPostById } from '@/lib/getPostById'
import { Post } from '@/components/Post'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { useEffect, useState } from 'react'
import { ErrorLayout } from '@/components/ErrorLayout'
import { useSession } from '@/hooks/useSession'
import { Loading } from '@/components/Loading'

export default function Detail ({ postData = {} }) {
  const [data, setData] = useState({})
  const [images, setImages] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [sellerData, setSellerData] = useState({})
  const [initialFav, setInitialFav] = useState(null)
  const { session } = useSession()

  useEffect(() => {
    if (postData.usuarioId !== session?.id && session?.id && initialFav === null) {
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
        .then(res => res.json())
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

      <ErrorLayout/>
    </Layout>
    )
  } else {
    console.log('fav', initialFav)
    return (
    <Layout>
      <Header disabled={true}/>
      { data && images.length > 0 && initialFav !== null
        ? <Post buttons={true} initialFav={initialFav} id={postData.id} title={data.titulo} price={data.precio} userId={session?.id} ownProduct={postData.usuarioId === session?.id} originalPrice={data.precioOriginal || data.precio} imageUrls={images} detail={data.descripcion} selectedTalle={{ nombre: 'XL' }} sellerData={sellerData} />
        : (
        <div className='mt-20'>
          <Loading />

        </div>
          )
    }

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
