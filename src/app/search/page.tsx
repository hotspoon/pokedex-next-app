"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

function SearchResultsComponent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query || "")}`)
        if (!res.ok) {
          throw new Error("Pokemon not found")
        }
        const data = await res.json()
        setResult(data)
      } catch (err) {
        setError("Pokemon not found")
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchSearchResults()
    }
  }, [query])

  if (loading) return <div>Searching...</div>
  if (error) return <div>{error}</div>
  if (!result) return null

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Pokedex
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <Image src={result.image} alt={result.name} width={200} height={200} className="mx-auto" />
        <h1 className="text-2xl font-bold text-center capitalize mt-4">{result.name}</h1>
        <p className="text-center mt-2">ID: {result.id}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Types:</h2>
          <ul className="flex justify-center space-x-2">
            {result.types.map((type: string) => (
              <li key={type} className="capitalize bg-gray-200 px-2 py-1 rounded">
                {type}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={`/pokemon/${result.name}`}
          className="mt-4 block text-center text-blue-500 hover:underline"
        >
          View Full Details
        </Link>
      </div>
    </div>
  )
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsComponent />
    </Suspense>
  )
}
