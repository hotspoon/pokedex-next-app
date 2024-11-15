"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ClientPage(pokemon: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="container-search mb-4">
        <Label className="text-xl">Name or number</Label>
        <div className="container-input-btn mt-2">
          <Input placeholder="Ex. Bulbasaur" className="py-5" defaultValue="" />
        </div>
      </div>
      <Card>
        <CardContent>
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold uppercase  text-center mt-4 tracking-widest my-0">
                bulbasaur
              </h2>
              <p className="mt-1 mb-0 font-bold text-xl"># {"1".toString().padStart(3, "0")}</p>
            </div>
            <div className="flex justify-center">
              <Link href={`/details/${"name"}`}>
                <Image
                  className="animate-up-down"
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                  alt="bulbasaur"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
            <div>
              <div className="flex justify-center gap-4 mt-4 uppercase w-full">
                <Badge className=" text-white px-4 py-1 rounded-full text-base grass">Grass</Badge>
                <Badge className=" text-white px-4 py-1 rounded-full text-base grass">poison</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold uppercase  text-center mt-4 tracking-widest my-0">
                charmander
              </h2>
              <p className="mt-1 mb-0 font-bold text-xl"># {"4".toString().padStart(3, "0")}</p>
            </div>
            <div className="flex justify-center">
              <Link href={`/details/${"name"}`}>
                <Image
                  className="animate-up-down"
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                  alt="bulbasaur"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
            <div>
              <div className="flex justify-center gap-4 mt-4 uppercase">
                <Badge className=" text-white px-4 py-1 rounded-full text-base w-full text-center fire">
                  Fire
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientPage
