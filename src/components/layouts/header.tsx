import Link from "next/link"
import React from "react"

function Header() {
  return (
    <header className="bg-red-500 text-white text-center py-12">
      <Link href="/">
        <h1 className="text-4xl font-bold">Pokedex</h1>
      </Link>
    </header>
  )
}

export default Header
