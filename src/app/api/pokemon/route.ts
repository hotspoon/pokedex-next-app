import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get("limit")) || 20
  const offset = Number(searchParams.get("offset")) || 0

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    if (!res.ok) {
      throw new Error("Failed to fetch Pokemon")
    }
    const data = await res.json()
    return NextResponse.json(data.results)
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while fetching Pokemon" }, { status: 500 })
  }
}
