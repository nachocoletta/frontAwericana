import InputEmail from '../Input/InputEmail'
import { Submit } from '../Buttons/Submit'
export default function ValedateEmail () {
  return (
    <div>

<h3 className="font-bold font text-4xl mb-5">Valida tu e-email</h3>
<p>Hemos enviado un e-mail a tu casilla con un código de confirmación, por favor ingresalo a continuación</p>
    <section className='flex justify-center items-center mt-20'>
      <form className='flex justify-center items-center flex-col'>
        <div className='flex gap-2 '>
        <InputEmail/>
        <InputEmail/>
        <InputEmail/>
        <InputEmail/>
        <InputEmail/>
        <InputEmail/>
        </div>
        <Submit className='mt-10'>Validar</Submit>
        </form>
        </section>
    </div>
  )
}
