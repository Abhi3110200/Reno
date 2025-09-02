import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { School, Plus, Search, Database, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">School Management System</h1>
                <p className="text-sm text-gray-600">Manage school data efficiently</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/add-school">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add School
                </Button>
              </Link>
              <Link href="/schools">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  View Schools
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Database className="w-4 h-4" />
              School Data Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Streamline Your School
              <span className="text-blue-600"> Data Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
              A comprehensive solution to add, manage, and explore school information with an intuitive interface and
              powerful search capabilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/add-school">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                Add New School
              </Button>
            </Link>
            <Link href="/schools">
              <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                <Search className="w-5 h-5 mr-2" />
                Browse Schools
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Easy School Registration</CardTitle>
                <CardDescription>
                  Add new schools with comprehensive form validation and image upload capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Advanced Search & Filter</CardTitle>
                <CardDescription>
                  Find schools quickly with powerful search and filtering options by location and criteria
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Location-Based Display</CardTitle>
                <CardDescription>
                  View schools in an organized grid or list format with detailed location information
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Schools Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600">States Included</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <School className="h-6 w-6" />
            <span className="text-lg font-semibold">School Management System</span>
          </div>
          <p className="text-gray-400 mb-6">Built with Next.js, React Hook Form, and modern web technologies</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/add-school">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-gray-600 hover:bg-gray-800 bg-transparent"
              >
                Add School
              </Button>
            </Link>
            <Link href="/schools">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-gray-600 hover:bg-gray-800 bg-transparent"
              >
                View Schools
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
