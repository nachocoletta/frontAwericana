export async function registerUser (data) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`
  const { passwordConfirmation, ...bodyData } = data
  const BODY = {
    ...bodyData,
    rol: 'user'
  }

  const request = fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(BODY)
  })

  const response = await request

  return response
}
