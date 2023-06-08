import Link from 'next/link'
import { useRouter } from 'next/router'
import { Input } from '@/components/Input'
import { Form } from '@/components/Form'
import { useFormFields } from '@/hooks/useFormFields'
import { Submit } from '../Buttons/Submit'
import { useState, useEffect } from 'react'
import { useValidator } from '@/hooks/useValidator'
import { useAuth } from '@/hooks/useAuth'

export function LoginForm () {
  const { login, error: submitError } = useAuth()
  const [error, setError] = useState(null)
  const validator = useValidator()
  const [isLoading, setIsLoading] = useState(false)
  const { push, query } = useRouter()
  const { data, handleChange } = useFormFields({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (isLoading && !error) {
      login(data)
        .then(res => {
          if (res) push('/')
        })
        .catch(err => {
          console.error(err)
        })
    }
    setIsLoading(false)
  }, [isLoading])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(validator(data))
  }

  return (
    <Form onSubmit={handleSubmit}>
        {query?.success ? <p className='text-primary text-big text-center'>Usuario registrado, inicia sesión para continuar</p> : null}
        <Input name='email' error={error?.email} placeholder='Ingresa tu e-mail' type={'text'} label={'Ingresa tu e-mail'} onChange={handleChange} />
        <Input name='password' error={error?.password} placeholder='Ingresa tu contraseña' type={'password'} label={'Ingresa tu contraseña'} onChange={handleChange} />
        <Link href={'#'} className="ml-18 underline cursor-pointer text-black">¿Olvidaste Tu Contraseña?</Link>
        <Submit center={true} isLoading={isLoading} >INICIAR SESIÓN</Submit>
        {submitError ? <p className='text-red text-big text-center'>Credenciales inválidas, intentalo de nuevo</p> : null}
    </Form>
  )
}
