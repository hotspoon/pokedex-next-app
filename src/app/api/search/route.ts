import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)

  if (!res.ok) {
    return NextResponse.json({ error: "Pokemon not found" }, { status: 404 })
  }

  const pokemon = await res.json()

  return NextResponse.json({
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((type: { type: { name: string } }) => type.type.name)
  })
}
