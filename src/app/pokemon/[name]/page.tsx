import EvolutionChain from "@/components/pokemon/EvolutionChain"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

async function getPokemonDetails(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon details")
  }
  return res.json()
}

async function getPokemonSpecies(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon species")
  }
  return res.json()
}

async function getEvolutionChain(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch evolution chain")
  }
  return res.json()
}

const typeColors: { [key: string]: string } = {
  bug: "bg-green-200",
  dark: "bg-gray-300",
  dragon: "bg-indigo-200",
  electric: "bg-yellow-200",
  fairy: "bg-pink-200",
  fighting: "bg-red-200",
  fire: "bg-red-200",
  flying: "bg-blue-200",
  ghost: "bg-indigo-200",
  grass: "bg-green-200",
  ground: "bg-yellow-300",
  ice: "bg-blue-100",
  normal: "bg-gray-200",
  poison: "bg-purple-200",
  psychic: "bg-pink-200",
  rock: "bg-yellow-400",
  steel: "bg-gray-300",
  water: "bg-blue-200"
}

export default async function PokemonDetail({ params }: any) {
  const { name } = await params
  const pokemon = await getPokemonDetails(name)
  const species = await getPokemonSpecies(name)
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url)

  const paddedId = pokemon.id.toString().padStart(3, "0")

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="text-gray-700 hover:text-black mb-4 block">
          &larr; Back to Pokedex
        </Link>

        <Card className="bg-gray-100 border-gray-300">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
              <p className="text-2xl text-gray-500">#{paddedId}</p>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Image and Types */}
              <div>
                <Image
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  width={400}
                  height={400}
                  className="mx-auto animate-up-down"
                  priority
                />
                <div className="flex justify-center gap-4 mt-4">
                  {pokemon.types.map((type: { type: { name: string } }) => (
                    <span
                      key={type.type.name}
                      className={`${
                        typeColors[type.type.name]
                      } px-6 py-2 rounded-full text-black uppercase font-bold`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Stats and Info */}
              <div className="space-y-6">
                {/* Pokemon Description */}
                <p className="text-gray-700">
                  {species.flavor_text_entries
                    .find((entry: any) => entry.language.name === "en")
                    ?.flavor_text.replace(/\f/g, " ")}
                </p>

                {/* Pokemon Info Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="text-gray-500 mb-1">Height</h3>
                    <p>{pokemon.height / 10} M</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 mb-1">Weight</h3>
                    <p>{pokemon.weight / 10} Kg</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 mb-1">Abilities</h3>
                    <p className="capitalize">
                      {pokemon.abilities.map((ability: any) => ability.ability.name).join(", ")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 mb-1">Habitat</h3>
                    <p className="capitalize">{species.habitat?.name || "Unknown"}</p>
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Stats</h2>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat: { base_stat: number; stat: { name: string } }) => (
                      <div key={stat.stat.name}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize text-gray-500">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <Progress
                          value={(stat.base_stat / 255) * 100}
                          className="h-2 bg-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Evolution Chain */}
            <div className="mt-8">
              {/* <h2 className="text-2xl font-bold mb-4">Evolution</h2> */}
              <EvolutionChain chain={evolutionChain.chain} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
