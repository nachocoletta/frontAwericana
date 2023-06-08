import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export function Fav ({ state, toggleFav }) {
  return (
    <>
    {
      state
        ? <>
                  <AiFillHeart className='fill-primary' size={20} />
                  <p onClick={toggleFav} className='w-2/4 cursor-pointer inline-block text-primary whitespace-nowrap font-normal text-normal underline'>Quitar de favoritos</p>
                </>
        : <>
                  <AiOutlineHeart className='fill-primary' size={20}/>
                  <p onClick={toggleFav} className='w-2/4 cursor-pointer inline-block text-primary whitespace-nowrap font-normal text-normal underline'>Agregar a favoritos</p>
                </>
              }
              </>
  )
}
