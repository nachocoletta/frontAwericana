import { useEffect, useState } from 'react'

export function useCart (userId, itemId) {
  const [isAdded, setIsAdded] = useState(false)
  const [userCart, setUserCart] = useState()

  useEffect(() => {
    if (userId) {
      getUserCart()
        .then(res => res.ok ? res.json() : res)
        .then(res => {
          setUserCart(res)
          if (res.carrito.findIndex(item => item.publicacion.id === itemId) !== -1) setIsAdded(true)
        })
        .catch(console.error)
    }
  }, [userId])

  const getUserCart = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito`, {
      credentials: 'include'
    })
  }

  const addToCart = async (id) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        publicacionId: id || itemId
      })
    })

    if (req.ok) {
      const publication = await req.json()
      setUserCart(prev => prev.carrito.concat(publication))
    }
  }

  const deleteCartItem = async (id) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ publicacionId: id || itemId })
    })

    if (req.ok) {
      const itemIndex = userCart.carrito.findIndex((item) => item.publicacion.id === id)
      if (itemIndex !== -1) {
        const updatedCarritoData = [...userCart.carrito]
        updatedCarritoData.splice(itemIndex, 1)
        setUserCart({ ...userCart, carrito: updatedCarritoData })
      }
    }
  }

  return { getUserCart, deleteCartItem, userCart, isAdded, addToCart, setIsAdded }
}
