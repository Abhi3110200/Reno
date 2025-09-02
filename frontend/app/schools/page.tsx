"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Search, Grid, List, ArrowLeft, AlertCircle, Database } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

interface SchoolData {
  id: number
  school_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  image_path?: string
  created_at: string
}

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<SchoolData[]>([])
  const [filteredSchools, setFilteredSchools] = useState<SchoolData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedState, setSelectedState] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/schools")

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          if (response.status === 500 && errorData.error?.includes("doesn't exist")) {
            throw new Error("DATABASE_SETUP_REQUIRED")
          }
          throw new Error("Failed to fetch schools")
        }

        const data = await response.json()
        setSchools(data.schools || [])
        setFilteredSchools(data.schools || [])
      } catch (err) {
        console.error("Error fetching schools:", err)
        if (err instanceof Error && err.message === "DATABASE_SETUP_REQUIRED") {
          setError("DATABASE_SETUP_REQUIRED")
        } else {
          setError("Failed to load schools. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSchools()
  }, [])

  const cities = Array.from(new Set(schools.map((school) => school.city)))
  const states = Array.from(new Set(schools.map((school) => school.state)))

  useEffect(() => {
    let filtered = schools

    if (searchTerm) {
      filtered = filtered.filter(
        (school) =>
          school.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.state.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCity !== "all") {
      filtered = filtered.filter((school) => school.city === selectedCity)
    }

    if (selectedState !== "all") {
      filtered = filtered.filter((school) => school.state === selectedState)
    }

    setFilteredSchools(filtered)
  }, [searchTerm, selectedCity, selectedState, schools])

  const SchoolCard = ({ school }: { school: SchoolData }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={school.image_path || "/placeholder.svg?height=200&width=300&query=school building"}
            alt={school.school_name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {school.city}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {school.school_name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{school.address}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{school.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="truncate">{school.email}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-gray-500">
              {school.state} - {school.pincode}
            </div>
            <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600 bg-transparent">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const SchoolListItem = ({ school }: { school: SchoolData }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={school.image_path || "/placeholder.svg?height=80&width=120&query=school building"}
            alt={school.school_name}
            className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {school.school_name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {school.address}, {school.city}, {school.state} - {school.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{school.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{school.email}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="ml-4 bg-transparent">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schools...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            {error === "DATABASE_SETUP_REQUIRED" ? (
              <>
                <Database className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Database Setup Required</h3>
                <p className="text-gray-600 mb-4">
                  The schools table doesn&apos;t exist in your database. You need to run the setup SQL commands first.
                </p>
                <div className="space-y-2">
                  <Link href="/setup">
                    <Button className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Go to Setup Instructions
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Schools</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">School Directory</h1>
              <p className="text-gray-600">Discover and explore schools in your area</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search schools by name, city, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredSchools.length} of {schools.length} schools
          </p>
        </div>

        {filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredSchools.map((school) =>
              viewMode === "grid" ? (
                <SchoolCard key={school.id} school={school} />
              ) : (
                <SchoolListItem key={school.id} school={school} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
