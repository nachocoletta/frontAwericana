import Image from 'next/image'
import { Stars } from './Stars'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Fav } from '@/components/Post/Fav'

export const Mobile = ({ toggleFav, images, ownProduct, title, price, size, detail, calificacion, nombre, apellido, originalPrice, isFav = false }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 6000,
    cssEase: 'linear'
  }

  return (
            <article className="p-4">
                <section id="producto">
                    <div>
                        <Slider {...settings} className='w-full overflow-hidden rounded-tr-3xl rounded-tl-3xl'>
                            {images.map((src, i) => {
                              return (
                                <Image
                                  key={src + i}
                                  src={src}
                                  width={379}
                                  height={224}
                                  className='h-full object-contain'
                                  alt="Imagen del producto"
                                />
                              )
                            })}
                        </Slider>
                    </div>
                    <div className="flex justify-between mt-5">
                        <div className='flex flex-col gap-4'>
                            {
                              originalPrice !== price && originalPrice
                                ? <div className='flex gap-4 mb-4'>
                                    <p className='text-3xl font-bold leading-5 text-black line-through'>${originalPrice}</p>
                                    <p className='text-3xl font-bold leading-5 text-red'>${price}</p>
                                  </div>
                                : <p className='text-3xl font-bold leading-5 text-black'>${price}</p>
                            }
                            <p className="text-2xl">{title}</p>
                            <p className="text-xl">{size.nombre}</p>
                        </div>
                        <span className='flex justify-center mr-10 mt-1 gap-2 h-fit items-center'>
                        { ownProduct ? null : <Fav state={isFav} toggleFav={toggleFav} /> }
                        </span>
                    </div>
                    <div className='mt-4'>
                        <p className="text-xl mb-4 font-thin">{detail}</p>
                        <div className='flex justify-between font-thin'>
                            <p className="text-xl">{`${nombre} ${apellido}`}</p>
                            <Stars rating={calificacion} />
                        </div>
                    </div>
                </section>
            </article>
  )
}
