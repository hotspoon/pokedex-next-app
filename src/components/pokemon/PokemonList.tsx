"use client"

import { useState, useEffect, useCallback } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import PokemonCard from "./PokemonCard"
import SearchBar from "../others/search-bar"
import { ClipLoader } from "react-spinners"

interface Pokemon {
  name: string
  url: string
  id: number
  types: string[]
}

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [offset, setOffset] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const limit = 20

  const fetchPokemon = useCallback(async () => {
    if (searchQuery) return // Don't fetch more if there's a search query

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json()
    const newPokemon = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const detailRes = await fetch(p.url)
        const detailData = await detailRes.json()
        return {
          name: p.name,
          url: p.url,
          id: detailData.id,
          types: detailData.types.map((t: { type: { name: string } }) => t.type.name)
        }
      })
    )
    setPokemon((prevPokemon) => [...prevPokemon, ...newPokemon])
    setOffset((prevOffset) => prevOffset + limit)
  }, [offset, searchQuery])

  const searchPokemon = useCallback(
    async (query: string) => {
      if (!query) {
        setOffset(0)
        setPokemon([])
        fetchPokemon()
        return
      }

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      if (res.ok) {
        const data = await res.json()
        setPokemon([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            id: data.id,
            types: data.types.map((t: { type: { name: string } }) => t.type.name)
          }
        ])
      } else {
        setPokemon([])
      }
    },
    [fetchPokemon]
  )

  useEffect(() => {
    if (searchQuery) {
      searchPokemon(searchQuery)
    } else if (pokemon.length === 0) {
      fetchPokemon()
    }
  }, [searchQuery, fetchPokemon, searchPokemon, pokemon.length])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setOffset(0)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={pokemon.length}
        next={fetchPokemon}
        hasMore={!searchQuery}
        loader={
          <div className="flex justify-center items-center p-4">
            <ClipLoader color="#3498db" />
          </div>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {pokemon.map((p, index) => (
          <PokemonCard key={index} name={p.name} id={p.id} types={p.types} />
        ))}
      </InfiniteScroll>
      {searchQuery && pokemon.length === 0 && (
        <p className="text-center mt-4">No Pokemon found matching your search.</p>
      )}
    </>
  )
}
