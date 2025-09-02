import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function GET() {
  try {
    console.log("[v0] Attempting to fetch schools from database")

    await pool.execute("SELECT 1")
    console.log("[v0] Database connection successful")

    const [rows] = await pool.execute("SELECT * FROM schools ORDER BY created_at DESC")
    console.log("[v0] Query executed successfully, rows:", rows)

    return NextResponse.json({ schools: rows })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch schools",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const pincode = formData.get("pincode") as string
    const image = formData.get("image") as File

    let imagePath = null

    // Handle image upload
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create unique filename
      const filename = `${Date.now()}-${image.name}`
      imagePath = `/schoolImages/${filename}`

      const uploadDir = path.join(process.cwd(), "public", "schoolImages")
      await mkdir(uploadDir, { recursive: true })

      // Save to public/schoolImages directory
      await writeFile(path.join(uploadDir, filename), buffer)
    }

    // Insert into database
    const [result] = await pool.execute(
      `INSERT INTO schools (school_name, email, phone, address, city, state, pincode, image_path) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, address, city, state, pincode, imagePath],
    )

    return NextResponse.json({ message: "School added successfully", id: (result as any).insertId }, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 })
  }
}
