import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"

export async function GET(){

  const resToken = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/token")
  const token_data = await resToken.json()
  const token = await token_data.access_token
  const spotifyArtistAPI = process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_API
  const id = process.env.NEXT_PUBLIC_ARTIST_ID
  const offset = process.env.NEXT_PUBLIC_OFFSET
  const limit = process.env.NEXT_PUBLIC_LIMIT
  const groups = process.env.NEXT_PUBLIC_GROUPS

  const res = await fetch(`${spotifyArtistAPI}${id}/albums?${groups}&${limit}&${offset}`,{
    method:"GET",  
    headers: {'Authorization': `Bearer ${token}`}
  })

    const albums_data = await res.json()
    const albums = await albums_data.items 

    return NextResponse.json(albums, {status:200})
}
