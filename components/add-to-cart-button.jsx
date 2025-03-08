"use client"

import { useState } from "react"
import { addToCart } from "@/lib/actions"

export function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddToCart = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      await addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
      setMessage("Added to cart!")
    } catch (error) {
      console.error("Failed to add to cart:", error)
      setMessage("Failed to add to cart")
    } finally {
      setIsLoading(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <button className="border rounded-l-md px-3 py-2" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          -
        </button>
        <span className="border-t border-b px-4 py-2">{quantity}</span>
        <button className="border rounded-r-md px-3 py-2" onClick={() => setQuantity((q) => q + 1)}>
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {product.colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-200"}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <button
        className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>

      {message && <div className="text-center mt-2 text-green-600 font-medium">{message}</div>}
    </div>
  )
}

