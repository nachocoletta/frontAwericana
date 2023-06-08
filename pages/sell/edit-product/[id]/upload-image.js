import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Submit } from '@/components/Buttons/Submit'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BiUpload } from 'react-icons/bi'
import { Layout } from '@/components/Layout'
import { useError } from '@/hooks/useError'
import { Tertiary } from '@/components/Buttons/Tertiary'

export default function UploadImage () {
  const [, setSelectedImages] = useState([])
  const [uploadedImageUrls, setUploadedImageUrls] = useState([])
  const { error, setError } = useError()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!isNaN(+id)) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${id}`)
        .then(res => res.ok ? res.json() : res)
        .then(res => {
          if (!res) router.push('/sell/my-products')
          else {
            const fromFetchImages = res.imagens.map(img => img.link)
            fromFetchImages.length -= 2
            setUploadedImageUrls(fromFetchImages)
            const storedFormData = localStorage.getItem('formData')
            if (storedFormData) {
              const parsedFormData = JSON.parse(storedFormData)
              const updatedFormData = {
                ...parsedFormData,
                imageUrls: fromFetchImages
              }
              localStorage.setItem('formData', JSON.stringify(updatedFormData))
            } else {
              router.push('/sell')
            }
          }
        })
    } else router.push('/sell/my-products')
  }, [])

  const handleImageUpload = async (event) => {
    setIsLoading(true)
    const files = event.target.files
    const uploadPromises = Array.from(files).map(async (file) => {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'oiz9dpai')

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dmxriftxk/image/upload', {
          method: 'POST',
          body: data
        })

        if (response.ok) {
          const responseData = await response.json()
          return responseData.secure_url
        } else {
          console.error(`Image upload failed for ${file.name}`)
          return null
        }
      } catch (error) {
        console.error(`Image upload failed for ${file.name}`, error)
        return null
      }
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    const filteredUrls = uploadedUrls.filter((url) => url !== null)

    setSelectedImages(prev => prev.concat(Array.from(files)))
    setUploadedImageUrls(prev => prev.concat(filteredUrls))

    const storedFormData = localStorage.getItem('formData')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      const updatedFormData = {
        ...parsedFormData,
        imageUrls: parsedFormData?.imageUrls ? parsedFormData.imageUrls.concat(filteredUrls) : filteredUrls
      }
      localStorage.setItem('formData', JSON.stringify(updatedFormData))
      setIsLoading(false)
    } else {
      setIsLoading(false)
      router.push('/sell')
    }
  }

  const handleImageDelete = (event, index) => {
    event.preventDefault()
    const updatedImageUrls = [...uploadedImageUrls]
    updatedImageUrls.splice(index, 1)
    const storedFormData = localStorage.getItem('formData')
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData)
      const updatedFormData = {
        ...parsedFormData,
        imageUrls: updatedImageUrls
      }
      localStorage.setItem('formData', JSON.stringify(updatedFormData))
      setIsLoading(false)
    }
    setUploadedImageUrls(updatedImageUrls)
  }

  const handleCancel = () => {
    localStorage.clear()
    router.push('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (uploadedImageUrls.length > 0) {
      if (uploadedImageUrls.length > 10) setError({ images: 'Por favor, añada un máximo de 10 imágenes' })
      else router.push(`/sell/edit-product/${id}/preview`)
    } else {
      setError({ images: 'Por favor, añade al menos una imagen' })
    }
  }

  return (
    <Layout>
      <Header disabled={true} />
      <h2 className="font-bold text-4xl mt-10 mb-10 md:ml-10 md:text-left text-center">Sube las fotos de tu producto</h2>
      <section className='flex flex-col justify-center items-center'>
        <form className="flex justify-center items-center flex-col">
          <div className='flex justify-center flex-col items-center'>
            {uploadedImageUrls.length > 0 && (
              <div className='min-w-[250px] p-2 max-w-[800px] w-fit h-[400px] gap-3 flex-wrap bg-slate-100 flex '>
                {uploadedImageUrls.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img className='w-[120px] h-[120px]' src={imageUrl} alt={`Uploaded ${index + 1}`} />
                    <button
                      className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-6 h-6 flex justify-center items-center"
                      onClick={(e) => handleImageDelete(e, index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              id="upload-input"
              type="file"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-input" className="text-[200px] mt-6 cursor-pointer text-secondary">
              <BiUpload className='bg-slate-300 rounded-[100px] py-2' />
            </label>
          </div>
          <p className='mt-5 mb-5 text-normal font-bold text-center'>Selecciona las imágenes de tu dispositivo</p>
            {error?.images ? <p className='text-red text-big font-extrabold text-center'>{error?.images}</p> : null}
          <Submit center={true} onClick={handleSubmit} isLoading={isLoading}>Guardar Y Continuar</Submit>
        </form>
      </section>

      {!isLoading
        ? <div className='flex justify-center max-w-[410px] md:max-w-none m-auto'>
          <Tertiary center={true} onClick={handleCancel}>Cancelar</Tertiary>
      </div>
        : null}
      <Footer />
    </Layout>
  )
}
