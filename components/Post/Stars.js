import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export function Stars ({ rating = 0 }) {
  const realRating = rating > 5 ? rating / 2 : rating
  const ints = Math.trunc(realRating)
  const floats = realRating - ints

  const Stars = Array.from({ length: ints }).map((e, i) => <BsStarFill className='fill-primary text-[25px]' key={i + ints} />)
  const halfStars = floats > 0.3 ? [<BsStarHalf className='fill-primary text-[25px]' key={floats} />] : []
  const emptyStars = Stars.length + halfStars.length < 5 ? Array.from({ length: 5 - (Stars.length + halfStars.length) }).map((e, i) => <BsStar className='fill-primary text-[25px]' key={i + Stars.length + halfStars.length}/>) : []

  return (
  <span className='flex gap-1'>
    {
      Stars.concat(halfStars).concat(emptyStars)
    }
  </span>
  )
}
