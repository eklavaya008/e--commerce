import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group rounded-lg border overflow-hidden">
      <Link href={`/products/${product._id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </div>
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">New</div>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-medium mb-1 hover:underline">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

