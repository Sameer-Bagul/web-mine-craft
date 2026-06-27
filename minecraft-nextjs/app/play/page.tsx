"use client";

import dynamic from 'next/dynamic'

// Dynamically import the Game component so it only renders on the client side
// This prevents Next.js SSR errors with Three.js / WebGL
const Game = dynamic(() => import('../components/Game'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 text-white">
      Loading Game World...
    </div>
  )
})

export default function Play() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden">
      <Game />
    </main>
  )
}
