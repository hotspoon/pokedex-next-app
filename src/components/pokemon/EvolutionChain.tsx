import Image from "next/image"
import Link from "next/link"

interface EvolutionDetail {
  min_level: number | null
  trigger: {
    name: string
  }
}

interface EvolutionNode {
  species: {
    name: string
    url: string
  }
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionNode[]
}

interface EvolutionChainProps {
  chain: EvolutionNode
}

const EvolutionNode: React.FC<{ node: EvolutionNode; isLast: boolean }> = ({ node, isLast }) => {
  const pokemonId = node.species.url.split("/").slice(-2, -1)[0]
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

  return (
    <div className="flex flex-col items-center">
      <Image src={imageUrl} alt={node.species.name} width={96} height={96} />
      <Link href={`/pokemon/${node.species.name}`} className="text-blue-500 hover:underline">
        <h3 className="text-lg font-semibold capitalize">{node.species.name}</h3>
      </Link>
      {!isLast && node.evolution_details[0] && (
        <div className="my-2 text-sm text-gray-600">
          {node.evolution_details[0].trigger.name === "level-up" &&
          node.evolution_details[0].min_level
            ? `Level ${node.evolution_details[0].min_level}`
            : node.evolution_details[0].trigger.name}
        </div>
      )}
      {!isLast && <div className="text-2xl mb-2">↓</div>}
    </div>
  )
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ chain }) => {
  const renderEvolutionChain = (node: EvolutionNode): JSX.Element[] => {
    const result: JSX.Element[] = [
      <EvolutionNode key={node.species.name} node={node} isLast={node.evolves_to.length === 0} />
    ]

    if (node.evolves_to.length > 0) {
      result.push(...renderEvolutionChain(node.evolves_to[0]))
    }

    return result
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Evolution Chain</h2>
      <div className="flex flex-col items-center space-y-4">{renderEvolutionChain(chain)}</div>
    </div>
  )
}

export default EvolutionChain
