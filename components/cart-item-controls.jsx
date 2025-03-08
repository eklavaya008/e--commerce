"use client"

import { useState } from "react"
import { updateCartItemQuantity, removeCartItem } from "@/lib/actions"

export function CartItemControls({ item }) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem()
      return
    }

    setIsLoading(true)
    setQuantity(newQuantity)

    try {
      await updateCartItemQuantity({
        itemId: item.id,
        quantity: newQuantity,
      })
    } catch (error) {
      console.error("Failed to update quantity:", error)
      setQuantity(item.quantity) // Reset on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async () => {
    setIsLoading(true)

    try {
      await removeCartItem(item.id)
    } catch (error) {
      console.error("Failed to remove item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className="border rounded-l-md px-3 py-2"
        onClick={() => handleUpdateQuantity(quantity - 1)}
        disabled={isLoading}
      >
        -
      </button>
      <span className="border-t border-b px-4 py-2">{quantity}</span>
      <button
        className="border rounded-r-md px-3 py-2"
        onClick={() => handleUpdateQuantity(quantity + 1)}
        disabled={isLoading}
      >
        +
      </button>

      <button className="ml-4 text-red-500 hover:text-red-700" onClick={handleRemoveItem} disabled={isLoading}>
        Remove
      </button>
    </div>
  )
}

