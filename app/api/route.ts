import { updateXP } from '@/app/lib/actions';

export async function GET() {
    const res = await fetch('https://juantoman-json-server.glitch.me/cartas/7', {
      next: { revalidate: 5 }, // Revalidate every 60 seconds
    })
    const data = await res.json()
   
    return Response.json(data)
}

export async function POST() {
    const res = await updateXP("16a6edb8-beac-4be4-bdec-b464bec3e919") 
    const data = await res.message
    return Response.json({ data })
  }