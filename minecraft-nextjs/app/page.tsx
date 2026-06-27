import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-6xl font-extrabold tracking-tighter bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Web Minecraft
        </h1>
        <p className="text-xl text-gray-400">
          A next-generation browser-based voxel game built with React Three Fiber, Rapier Physics, and Next.js.
        </p>
        
        <div className="flex gap-4 justify-center pt-8">
          <Link 
            href="/play" 
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors text-lg"
          >
            Play Now
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors text-lg"
          >
            Sign In
          </Link>
        </div>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-2">Infinite Worlds</h3>
            <p className="text-gray-400">Procedurally generated terrain powered by Web Workers for seamless exploration.</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-2">Fast Physics</h3>
            <p className="text-gray-400">Smooth player movement and collision detection using the Rapier physics engine.</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-2">Multiplayer Ready</h3>
            <p className="text-gray-400">Built from the ground up to support MMO-scale multiplayer environments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
