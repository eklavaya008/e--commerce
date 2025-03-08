import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/products"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    category?: string
    sort?: string
    price?: string
  }
}) {
  const products = await getProducts(searchParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters />
        </div>

        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

