export async function loginUser (data) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
  const BODY = data

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
