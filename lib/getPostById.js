export async function getPostById (postId) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/publicaciones/${postId}`
  const request = await fetch(URL)
  if (request.ok) {
    console.log('done')
    return await request.json()
  } else return null
}
