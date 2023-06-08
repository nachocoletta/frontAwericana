import { Input } from '@/components/Input'
import { Submit } from '../Buttons/Submit'
import { useFormFields } from '@/hooks/useFormFields'
import { Form } from '../Form'
import { useEffect, useState } from 'react'
import { useValidator } from '@/hooks/useValidator'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

export function SignupForm () {
  const { push } = useRouter()
  const [error, setError] = useState(null)
  const validator = useValidator()
  const [isLoading, setIsLoading] = useState(false)
  const { register, error: submitError } = useAuth()
  const { data, handleChange } = useFormFields({
    nombre: '',
    apellido: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
    fechaNacimiento: '',
    dni: ''
  })

  useEffect(() => {
    if (isLoading && !error) {
      const { passwordConfirmation, ...bodyData } = data
      register(bodyData)
        .then(res => {
          if (res) {
            push({
              pathname: '/auth/signin',
              query: { success: true }
            })
          }
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
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Input error={error?.nombre} name={'nombre'} type='text' placeholder={'Nombre(s)*'} label={'Nombre(s)*'} onChange={handleChange}/>
        <Input error={error?.apellido} name={'apellido'} type='text' placeholder={'Apellido(s)*'} label={'Apellido(s)*'} onChange={handleChange} />
        <Input error={error?.email} name={'email'} type='email' placeholder={'Email*'} label={'Email*'} onChange={handleChange}/>
        <Input error={error?.emailConfirmation} name={'emailConfirmation'} type='email' placeholder={'Repetir email*'} label={'Repetir email*'} onChange={handleChange}/>
        <Input error={error?.password} name={'password'} type={'password'} placeholder={'Contraseña*'} label={'Contraseña*'} onChange={handleChange} />
        <Input error={error?.passwordConfirmation} name={'passwordConfirmation'} type={'password'} placeholder={'Repetir contraseña*'} label={'Repetir contraseña*'} onChange={handleChange} />
        <Input error={error?.dni} name={'dni'} type='number' placeholder={'DNI*'} label={'DNI*'} onChange={handleChange} />
        <Input error={error?.fechaNacimiento} name={'fechaNacimiento'} type={'date'} placeholder={'Fecha de nacimiento*'} label={'Fecha de nacimiento*'} onChange={handleChange} />
      </div>
      <Submit center={true} isLoading={isLoading}>REGISTRARSE</Submit>
      {submitError ? <p className='text-red text-big text-center'>{'Hubo un error al registrarse, intentalo de nuevo'}</p> : null}
    </Form>
  )
}
