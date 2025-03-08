"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { getDb, ObjectId } from "@/lib/db"
import { getProductById } from "@/lib/products"

// Add an item to the cart
export async function addToCart({ productId, quantity, size, color }) {
  const cookieStore = cookies()
  let cartId = cookieStore.get("cartId")?.value

  const db = await getDb()
  const cartsCollection = db.collection("carts")

  // Get the product
  const product = await getProductById(productId)
  if (!product) {
    throw new Error("Product not found")
  }

  if (!cartId) {
    // Create a new cart
    const result = await cartsCollection.insertOne({
      userId: null, // Anonymous cart
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    cartId = result.insertedId.toString()
    cookieStore.set("cartId", cartId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  // Check if the item already exists in the cart
  const cart = await cartsCollection.findOne({ _id: new ObjectId(cartId) })

  if (!cart) {
    throw new Error("Cart not found")
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product._id.toString() === productId && item.size === size && item.color === color,
  )

  if (existingItemIndex > -1) {
    // Update existing item quantity
    await cartsCollection.updateOne(
      { _id: new ObjectId(cartId) },
      {
        $inc: { [`items.${existingItemIndex}.quantity`]: quantity },
        $set: { updatedAt: new Date() },
      },
    )
  } else {
    // Add new item to cart
    await cartsCollection.updateOne(
      { _id: new ObjectId(cartId) },
      {
        $push: {
          items: {
            id: new ObjectId().toString(),
            product,
            quantity,
            size,
            color,
          },
        },
        $set: { updatedAt: new Date() },
      },
    )
  }

  revalidatePath("/cart")
}

// Update cart item quantity
export async function updateCartItemQuantity({ itemId, quantity }) {
  const cookieStore = cookies()
  const cartId = cookieStore.get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart not found")
  }

  const db = await getDb()
  const cartsCollection = db.collection("carts")

  // Find the cart and the item index
  const cart = await cartsCollection.findOne({ _id: new ObjectId(cartId) })

  if (!cart) {
    throw new Error("Cart not found")
  }

  const itemIndex = cart.items.findIndex((item) => item.id === itemId)

  if (itemIndex === -1) {
    throw new Error("Item not found in cart")
  }

  // Update the quantity
  await cartsCollection.updateOne(
    { _id: new ObjectId(cartId) },
    {
      $set: {
        [`items.${itemIndex}.quantity`]: quantity,
        updatedAt: new Date(),
      },
    },
  )

  revalidatePath("/cart")
}

// Remove item from cart
export async function removeCartItem(itemId) {
  const cookieStore = cookies()
  const cartId = cookieStore.get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart not found")
  }

  const db = await getDb()
  const cartsCollection = db.collection("carts")

  await cartsCollection.updateOne(
    { _id: new ObjectId(cartId) },
    {
      $pull: { items: { id: itemId } },
      $set: { updatedAt: new Date() },
    },
  )

  revalidatePath("/cart")
}

