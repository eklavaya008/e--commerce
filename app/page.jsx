import Link from "next/link"
import { getProducts } from "@/lib/products"

export default async function Home() {
  // Get products for each category
  const menProducts = await getProducts("men")
  const womenProducts = await getProducts("women")
  const kidsProducts = await getProducts("kids")
  const accessoriesProducts = await getProducts("accessories")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="mb-12">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Fashion collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Fashion Store</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-md">
              Discover our amazing collection of clothes
            </p>
            <Link
              href="#categories"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard title="Men's Collection" image="/placeholder.svg?height=300&width=300" link="/men" />
          <CategoryCard title="Women's Collection" image="/placeholder.svg?height=300&width=300" link="/women" />
          <CategoryCard title="Kids Collection" image="/placeholder.svg?height=300&width=300" link="/kids" />
          <CategoryCard title="Accessories" image="/placeholder.svg?height=300&width=300" link="/accessories" />
        </div>
      </section>

      {/* Men's Collection Preview */}
      <ProductSection title="Men's Collection" products={menProducts.slice(0, 4)} viewAllLink="/men" />

      {/* Women's Collection Preview */}
      <ProductSection title="Women's Collection" products={womenProducts.slice(0, 4)} viewAllLink="/women" />

      {/* Kids Collection Preview */}
      <ProductSection title="Kids Collection" products={kidsProducts.slice(0, 4)} viewAllLink="/kids" />

      {/* Accessories Preview */}
      <ProductSection title="Accessories" products={accessoriesProducts.slice(0, 4)} viewAllLink="/accessories" />
    </div>
  )
}

// Category Card Component
function CategoryCard({ title, image, link }) {
  return (
    <Link href={link} className="block group">
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
        <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <span className="mt-2 text-white border-b border-white">Shop Now</span>
        </div>
      </div>
    </Link>
  )
}

// Product Section Component
function ProductSection({ title, products, viewAllLink }) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={viewAllLink} className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden group">
            <Link href={`/product/${product._id}`} className="block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

