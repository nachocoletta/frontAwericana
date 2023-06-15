import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { BiTrash } from 'react-icons/bi'
import Link from 'next/link'
import Head from 'next/head'
import { useCart } from '@/hooks/useCart'
import { useSession } from '@/hooks/useSession'

export default function Index () {
  const { session } = useSession()
  const { deleteCartItem, userCart } = useCart(session?.id)

  const handleDeleteItem = async (itemId) => {
    deleteCartItem(itemId)
      .catch(console.error)
  }

  return (
    <Layout>
      <Head>
        <title>Mi Carrito | Awericana</title>
      </Head>
      <Header />

      <div className="px-[10%]">
        <h3 className="mt-20 mb-5 text-3xl">Producto</h3>
        <section>
          {userCart?.carrito && userCart.carrito.length > 0
            ? (
            <div className="">
              {userCart.carrito.map((item) => (
                <div
                  className="flex mt-5 py-4 px-11 shadow-down w-full justify-between items-center h-[160px]"
                  key={item.publicacion.id}
                >
                  <div className="flex items-center">
                    <img
                      className="w-[112px] h-[112px]"
                      src={item.publicacion.imagenPortada}
                      alt={item.publicacion.titulo}
                    />
                    <div className="pl-4">
                      <p className="text-2xl">{item.publicacion.titulo}</p>
                      <p className="text-1xl">{item.publicacion.talleId}</p>
                      <a>Ver Producto</a>
                    </div>
                  </div>
                  <p className="text-1xl" onClick={() => handleDeleteItem(item.publicacion.id)}>
                    <BiTrash className="cursor-pointer" />
                  </p>
                </div>
              ))}
            </div>
              )
            : (
            <p>No hay productos en el carrito</p>
              )}
        </section>

        <div className="flex items-center flex-col gap-4 mt-7 ">
          {userCart?.carrito && userCart.carrito.length > 0
            ? (
            <Link href="/cart/delivery">
              <button className="w-full  md:w-[28rem] hover:scale-110 min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-pointer bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition">
                Comprar Carrito
              </button>
            </Link>
              )
            : (
            <button
              className="w-full md:w-[28rem]  min-w-[200px] relative lg:w-[28rem] lg:h-14 py-3 cursor-no-drop bg-secondary select-none shadow-lg rounded-xl text-white font-md text-lg transition"
              disabled
            >
              Comprar Carrito
            </button>
              )}
        <Link href="/"> <button className="border-green-700 hover:scale-110 border w-full md:w-[28rem] relative lg:w-[28rem] lg:h-14 py-3 select-none shadow-lg rounded-xl font-md text-lg">
            Cancelar
          </button></Link>
        </div>
      </div>
    </Layout>
  )
}
