export async function logoutUser () {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/logoutLocal`
  const request = await fetch(URL, { credentials: 'include', mode: 'no-cors' })

  if (request.ok) return true
  else return false
}
