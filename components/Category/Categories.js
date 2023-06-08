import Category from '.'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { data } from 'autoprefixer'
import { Loading } from '@/components/Loading'

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/categoria`

  useEffect(() => {
    setIsLoading(true)
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false)
        setCategories(data.categorias)
      })
    console.log(data)
  }, [])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  }

  if (isLoading) return <Loading />

  return (
    <Slider {...settings}>
      {categories.map(category => (
        <Category key={category.id} name={category.nombre} img={category.link}/>
      ))}
    </Slider>
  )
}

export default Categories
