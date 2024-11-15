"use client"

import { useDebounce } from "@/app/hooks/useDebounce"
import { useState, useEffect } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    onSearch(debouncedSearch)
  }, [debouncedSearch, onSearch])

  return (
    <div className="mb-8">
      <label htmlFor="search" className="sr-only">
        Search Pokemon Name
      </label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokemon..."
        className="w-full p-2 border rounded"
        aria-label="Search Pokemon"
      />
    </div>
  )
}
