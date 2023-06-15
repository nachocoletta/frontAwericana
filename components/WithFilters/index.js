import { Categories } from '@/components/Category/Categories'
import Card from '@/components/Card'
import Link from 'next/link'
import { useState } from 'react'

export function WithFilters ({ talles, shown }) {
  const [, setCategory] = useState()

  return (
    <section className='flex flex-wrap justify-center gap-4 m-auto w-full p-4'>
            <section className='w-full m-2'>
              <Categories setCategory={setCategory} />
            </section>
            {
              shown.length === 0
                ? <p className=''>No se encontraron coincidencias</p>
                : shown.map(pub => {
                  return (
                <Link href={'/detail/:id'} as={`/detail/${pub.id}`} key={pub.id}>
                    <Card
                      precio={pub.precio}
                      titulo={pub.titulo}
                      talleMedidas={talles.find(el => el.id === pub.talleId).nombre}
                      imgSrc={pub.imagenPortada || null}
                      precioOriginal={pub.precioOriginal}
                      descuento={pub.descuento}
                      />
                  </Link>
                  )
                })}
      </section>
  )
}
