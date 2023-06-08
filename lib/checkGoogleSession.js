export async function checkGoogleSession (headers) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/success`
  const response = await fetch(URL, { headers, credentials: 'include' })
  const json = await response.json()

  return json
}
