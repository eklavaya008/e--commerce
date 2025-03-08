import Link from "next/link"
import { ShoppingBag, User, Search, Menu } from "lucide-react"
import "./globals.css"

export const metadata = {
  title: "Fashion Store | Shop the Latest Trends",
  description: "Discover the latest fashion trends for men, women, and kids.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </button>

              <Link href="/" className="text-xl font-bold">
                FASHION STORE
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link href="/men" className="text-sm font-medium hover:text-blue-600">
                  Men
                </Link>
                <Link href="/women" className="text-sm font-medium hover:text-blue-600">
                  Women
                </Link>
                <Link href="/kids" className="text-sm font-medium hover:text-blue-600">
                  Kids
                </Link>
                <Link href="/accessories" className="text-sm font-medium hover:text-blue-600">
                  Accessories
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>

              <button>
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </button>

              <Link href="/cart">
                <button className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                  <span className="sr-only">Cart</span>
                </button>
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-100 mt-12">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">FASHION STORE</h3>
                <p className="text-gray-600">Discover the latest trends in fashion and explore our new collections.</p>
              </div>

              <div>
                <h4 className="font-medium mb-4">Shop</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/men" className="text-gray-600 hover:text-gray-900">
                      Men's Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/women" className="text-gray-600 hover:text-gray-900">
                      Women's Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/kids" className="text-gray-600 hover:text-gray-900">
                      Kids' Clothing
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessories" className="text-gray-600 hover:text-gray-900">
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4">Stay Connected</h4>
                <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Subscribe</button>
                </div>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} Fashion Store. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'