import { getDb, ObjectId } from "@/lib/db"

// Sample product data for each category
const sampleProducts = {
  men: [
    {
      name: "Classic White T-Shirt",
      description: "A comfortable and versatile white t-shirt made from 100% organic cotton.",
      price: 24.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["white", "black", "gray"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Men's+T-Shirt",
    },
    {
      name: "Slim Fit Jeans",
      description: "Modern slim fit jeans with a comfortable stretch fabric.",
      price: 59.99,
      category: "men",
      sizes: ["30", "32", "34", "36"],
      colors: ["blue", "black", "gray"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Men's+Jeans",
    },
    {
      name: "Casual Button-Up Shirt",
      description: "A stylish button-up shirt for casual or semi-formal occasions.",
      price: 45.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["blue", "white", "black"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Button-Up+Shirt",
    },
    {
      name: "Leather Jacket",
      description: "Classic leather jacket with a modern twist.",
      price: 129.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["black", "brown"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Leather+Jacket",
    },
    {
      name: "Wool Sweater",
      description: "Warm and cozy wool sweater for colder days.",
      price: 89.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["navy", "gray", "burgundy"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Wool+Sweater",
    },
    {
      name: "Cargo Pants",
      description: "Durable cargo pants with multiple pockets.",
      price: 49.99,
      category: "men",
      sizes: ["30", "32", "34", "36"],
      colors: ["khaki", "olive", "black"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Cargo+Pants",
    },
    {
      name: "Polo Shirt",
      description: "Classic polo shirt for a casual yet refined look.",
      price: 34.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["navy", "red", "white", "black"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Polo+Shirt",
    },
    {
      name: "Hooded Sweatshirt",
      description: "Comfortable hoodie for everyday wear.",
      price: 39.99,
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["gray", "black", "navy"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Hoodie",
    },
  ],
  women: [
    {
      name: "Floral Summer Dress",
      description: "A beautiful floral dress perfect for summer days.",
      price: 49.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["blue", "pink", "yellow"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Summer+Dress",
    },
    {
      name: "Silk Blouse",
      description: "Elegant silk blouse for a sophisticated look.",
      price: 69.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["white", "cream", "light blue", "black"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Silk+Blouse",
    },
    {
      name: "High Waist Pants",
      description: "Stylish high waist pants that flatter your figure.",
      price: 54.99,
      category: "women",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["black", "beige", "olive"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=High+Waist+Pants",
    },
    {
      name: "Cardigan Sweater",
      description: "Soft and warm cardigan sweater for layering.",
      price: 44.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["cream", "gray", "pink"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Cardigan",
    },
    {
      name: "Denim Jacket",
      description: "Classic denim jacket that goes with everything.",
      price: 59.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["blue", "light blue", "black"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Denim+Jacket",
    },
    {
      name: "Pencil Skirt",
      description: "Elegant pencil skirt for office or formal occasions.",
      price: 39.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["black", "gray", "navy"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Pencil+Skirt",
    },
    {
      name: "Maxi Dress",
      description: "Flowing maxi dress for elegant summer style.",
      price: 64.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["red", "black", "floral"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Maxi+Dress",
    },
    {
      name: "Yoga Pants",
      description: "Comfortable yoga pants for exercise or casual wear.",
      price: 34.99,
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["black", "gray", "navy"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Yoga+Pants",
    },
  ],
  kids: [
    {
      name: "Kids T-Shirt",
      description: "Soft and colorful t-shirt for kids.",
      price: 19.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["blue", "red", "green", "yellow"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+T-Shirt",
    },
    {
      name: "Kids Jeans",
      description: "Durable jeans for active kids.",
      price: 29.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["blue", "light blue"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Jeans",
    },
    {
      name: "Kids Hoodie",
      description: "Warm hoodie with fun designs for kids.",
      price: 24.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["red", "blue", "green"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Hoodie",
    },
    {
      name: "Kids Dress",
      description: "Cute dress for special occasions.",
      price: 34.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["pink", "purple", "blue"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Dress",
    },
    {
      name: "Kids Pajamas",
      description: "Comfortable pajamas for a good night's sleep.",
      price: 22.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["blue", "pink", "green"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Pajamas",
    },
    {
      name: "Kids Shorts",
      description: "Comfortable shorts for warm weather.",
      price: 19.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["blue", "khaki", "green"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Shorts",
    },
    {
      name: "Kids Sweater",
      description: "Warm sweater for colder days.",
      price: 29.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["red", "blue", "green"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Sweater",
    },
    {
      name: "Kids Jacket",
      description: "Lightweight jacket for spring and fall.",
      price: 39.99,
      category: "kids",
      sizes: ["3T", "4T", "5T", "6T"],
      colors: ["blue", "red", "yellow"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Kids+Jacket",
    },
  ],
  accessories: [
    {
      name: "Casual Sneakers",
      description: "Comfortable sneakers for everyday wear.",
      price: 79.99,
      category: "accessories",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["white", "black", "red", "blue"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Sneakers",
    },
    {
      name: "Leather Belt",
      description: "Classic leather belt with metal buckle.",
      price: 29.99,
      category: "accessories",
      sizes: ["S", "M", "L"],
      colors: ["black", "brown"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Belt",
    },
    {
      name: "Beanie Hat",
      description: "Warm beanie hat for cold weather.",
      price: 19.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["black", "gray", "navy", "red"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Beanie",
    },
    {
      name: "Sunglasses",
      description: "Stylish sunglasses with UV protection.",
      price: 24.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["black", "brown", "tortoise"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Sunglasses",
    },
    {
      name: "Leather Wallet",
      description: "Slim leather wallet with multiple card slots.",
      price: 34.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["black", "brown"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Wallet",
    },
    {
      name: "Scarf",
      description: "Soft scarf for added warmth and style.",
      price: 22.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["gray", "navy", "red", "green"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Scarf",
    },
    {
      name: "Backpack",
      description: "Durable backpack for everyday use.",
      price: 49.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["black", "navy", "gray"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Backpack",
    },
    {
      name: "Watch",
      description: "Classic wristwatch with leather strap.",
      price: 89.99,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["black", "brown"],
      imageUrl: "/placeholder.svg?height=400&width=400&text=Watch",
    },
  ],
}

// Initialize the database with products if needed
export async function initializeProducts() {
  const db = await getDb()
  const productsCollection = db.collection("products")

  const count = await productsCollection.countDocuments()

  if (count === 0) {
    // Flatten all products into a single array
    const allProducts = [
      ...sampleProducts.men,
      ...sampleProducts.women,
      ...sampleProducts.kids,
      ...sampleProducts.accessories,
    ]

    // Insert all products into the database
    await productsCollection.insertMany(allProducts)
    console.log("Database initialized with sample products")
  }
}

// Get products by category
export async function getProducts(category) {
  await initializeProducts()

  const db = await getDb()
  const productsCollection = db.collection("products")

  const query = category ? { category } : {}

  const products = await productsCollection.find(query).toArray()

  return products
}

// Get a product by ID
export async function getProductById(id) {
  await initializeProducts()

  const db = await getDb()
  const productsCollection = db.collection("products")

  try {
    const product = await productsCollection.findOne({ _id: new ObjectId(id) })
    return product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

