export async function checkSession (headers) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/loginLocal/success`
  // const OPTIONS = process.env.NEXT_PUBLIC_API_URL.includes('localhost') ? { credentials: 'include', headers } : { credentials: 'include' }
  const request = await fetch(URL, { credentials: 'include', headers })
  const response = request
  const json = await response.json()
  console.log(json)

  return json
}
