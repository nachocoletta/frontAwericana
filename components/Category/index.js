import Image from 'next/image'
const Category = ({ name = 'sin nombre', img }) => {
  return (
        <div className='inline-block text-center m-2'>
            <Image
                className='rounded-full m-auto w-[100px]'
                src={img}
                width={104}
                height={104}
                alt="categoria"
            />
            <h2 className='mt-1 text-center'>{name}</h2>
        </div>

  )
}

export default Category
