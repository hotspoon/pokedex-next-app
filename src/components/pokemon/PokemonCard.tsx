import Image from "next/image"
import Link from "next/link"
import { Card } from "../ui/card"

interface PokemonCardProps {
  name: string
  id: number
  types: string[]
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300"
}

export default function PokemonCard({ name, id, types }: PokemonCardProps) {
  const paddedId = id.toString().padStart(3, "0")
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Card className="p-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold uppercase text-center mt-4 tracking-widest my-0">
          {name}
        </h2>
        <p className="mt-1 mb-0 font-bold text-xl">#{paddedId}</p>
      </div>
      <div className="flex justify-center">
        <Link href={`/pokemon/${name}`}>
          <Image
            className="animate-up-down"
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            priority
          />
        </Link>
      </div>
      <div>
        <div className="flex justify-center gap-4 mt-4 uppercase w-full">
          {types.map((type) => (
            <span
              key={type}
              className={`text-white px-4 py-1 rounded-full text-base ${
                typeColors[type.toLowerCase()] || "bg-gray-500"
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
