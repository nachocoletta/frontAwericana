import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import { TrackingComponent } from '@/components/ShipingTracking/index.js'
import Head from 'next/head'
import Link from 'next/link'
// import { HiTrash } from 'react-icons/hi'

export default function Shiptracking () {
  const imgUrl = ''
  const title = 'Medias epicas'
  // const price = ''
  const estado = 'Recibido'

  return (
    <Layout>
       <Head>
         <title>Estado del envio </title>
        </Head>
      <Header disabled={true} />
      <div className="flex justify-center">
      <h1 className='py-12 px-4 text-2xl leading-5'>Estado del envio </h1>

      </div>
      <section className=" max-w-screen-sm lg:max-w-5x2  m-auto mt-12 h-fit flex flex-col xl:flex-row xl:mt-20">

        <div className="flex px-5 py-4 mb-12 justify-stretch items-center gap-4 xl:gap-8 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] h-[120px] xl:ml-20 ">
            <img
              className="h-[80px] w-[80px] bg-gray-700"
              src={imgUrl}
            />
            <div className="flex flex-col   self-stretch justify-between leading-5 max-[480px]:w-3/5 min-[480px]:w-2/3 min-[540px]:w-3/4 min-[768px]:w-4/5">
              <div className="text-xl font-regular leading-5 text-black ">
                {title}
              </div>
              <div className="text-xl font-regular leading-5 text-primary ">
                {estado}
              </div>
              <div className="flex justify-around">
                {estado === 'Empacando'
                  ? (
                  <p
                    className="text-xs font-normal leading-5 text-black underline xl:text-primary xl:text-lg xl:no-underline xl:hover:underline"
                    href={'#'}

                  >
                    cancelar compra
                  </p>
                    )
                  : null}

                {estado === 'Recibido'
                  ? (
                  <Link
                    className="text-xs font-normal leading-5 text-black underline xl:text-primary xl:text-lg xl:no-underline xl:hover:underline"
                    href={'#'}

                  >
                    Calificar al vendedor
                  </Link>
                    )
                  : null}

                {estado === 'Recibido'
                  ? (
                  <p
                    className="text-xs font-normal leading-5 text-black underline xl:text-primary xl:text-lg xl:no-underline xl:hover:underline"
                    href={'#'}

                  >
                    devolver producto
                  </p>
                    )
                  : null}
              </div>
            </div>
        </div>

        <div className="flex justify-center xl:justify-start order-last xl:order-first ">
            <TrackingComponent estado={estado} />
        </div>

      </section>
    </Layout>
  )
}
