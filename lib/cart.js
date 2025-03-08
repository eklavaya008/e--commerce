import { cookies } from "next/headers"
import { getDb, ObjectId } from "@/lib/db"
import { getProductById } from "@/lib/products"

// Get or create a cart for the current user
export async function getCart() {
  const cookieStore = cookies()
  let cartId = cookieStore.get("cartId")?.value

  const db = await getDb()
  const cartsCollection = db.collection("carts")

  let cart = null

  if (cartId) {
    try {
      const foundCart = await cartsCollection.findOne({ _id: new ObjectId(cartId) })
      if (foundCart) {
        cart = foundCart
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  if (!cart) {
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

    cart = {
      _id: result.insertedId.toString(),
      userId: null,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  // Populate product details for each item
  const populatedItems = await Promise.all(
    cart.items.map(async (item) => {
      const product = await getProductById(item.product._id.toString())
      return {
        ...item,
        product: product || item.product,
      }
    }),
  )

  return {
    ...cart,
    items: populatedItems,
  }
}

