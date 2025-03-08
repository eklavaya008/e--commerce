import { MongoClient, ObjectId } from "mongodb"

// Check if MongoDB URI is available
if (!process.env.MONGODB_URI) {
  throw new Error('Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

// In development, use a global variable to preserve the connection
if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Get the database connection
export async function getDb() {
  const client = await clientPromise
  return client.db("ecommerce")
}

export { ObjectId }

