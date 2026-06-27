"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useState } from "react";
import Player from "./Player";
import UI from "./UI";
import ChunkManager from "./ChunkManager";

export default function Game() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 text-white cursor-pointer" onClick={() => setReady(true)}>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Minecraft Clone</h1>
            <p className="text-gray-300">Click to Play</p>
            <p className="text-sm mt-4 text-gray-500">WASD to move, Space to jump</p>
          </div>
        </div>
      )}

      {ready && <UI />}

      <Canvas camera={{ position: [8, 20, 8], fov: 75 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        
        {ready && <PointerLockControls />}

        <Physics>
          {ready && <Player />}
          <ChunkManager />
        </Physics>
      </Canvas>
    </>
  );
}
