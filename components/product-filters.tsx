"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 200])

  const categories = [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "accessories", label: "Accessories" },
  ]

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ]

  const colors = [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "blue", label: "Blue" },
    { id: "red", label: "Red" },
    { id: "green", label: "Green" },
  ]

  function handleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`/products?${params.toString()}`)
  }

  const filters = (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={searchParams.get("category") === category.id}
                onCheckedChange={() => handleFilter("category", category.id)}
              />
              <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Sizes</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size.id}`}
                checked={searchParams.get("size") === size.id}
                onCheckedChange={() => handleFilter("size", size.id)}
              />
              <label htmlFor={`size-${size.id}`} className="text-sm cursor-pointer">
                {size.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Colors</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color.id}`}
                checked={searchParams.get("color") === color.id}
                onCheckedChange={() => handleFilter("color", color.id)}
              />
              <label htmlFor={`color-${color.id}`} className="text-sm cursor-pointer">
                {color.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 200]}
          max={200}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block sticky top-20">{filters}</div>

      {/* Mobile filters */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter products by category, size, color, and price.</SheetDescription>
            </SheetHeader>
            <div className="py-4">{filters}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

