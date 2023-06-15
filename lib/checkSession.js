export async function checkSession (headers) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/loginLocal/success`
  // const OPTIONS = process.env.NEXT_PUBLIC_API_URL.includes('localhost') ? { credentials: 'include', headers } : { credentials: 'include' }
  const response = await fetch(URL, { credentials: 'include', headers })
  if (response.ok) {
    return await response.json()
  } else return { error: 'Something went wrong' }
}
