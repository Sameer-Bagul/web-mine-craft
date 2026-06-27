"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import WorldChunk from "./WorldChunk";
import { useStore } from "../store/useStore";

const CHUNK_SIZE = 16;
const RENDER_DISTANCE = 2;

export default function ChunkManager() {
  const chunks = useStore((state) => state.chunks);
  const addChunk = useStore((state) => state.addChunk);
  const removeChunk = useStore((state) => state.removeChunk);
  
  const workerRef = useRef<Worker | null>(null);
  const requestedChunks = useRef<Set<string>>(new Set());
  const lastChunkPos = useRef<{ x: number; z: number }>({ x: NaN, z: NaN });
  
  const { camera } = useThree();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../workers/chunkWorker.ts", import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { chunkX, chunkZ, blocks } = e.data;
      const key = `${chunkX},${chunkZ}`;
      addChunk(key, blocks);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [addChunk]);

  useFrame(() => {
    if (!workerRef.current) return;

    // Use camera position instead of Zustand state to avoid React re-renders
    const currentChunkX = Math.floor(camera.position.x / CHUNK_SIZE);
    const currentChunkZ = Math.floor(camera.position.z / CHUNK_SIZE);

    // Only update if we crossed into a new chunk
    if (currentChunkX === lastChunkPos.current.x && currentChunkZ === lastChunkPos.current.z) {
      return;
    }

    lastChunkPos.current = { x: currentChunkX, z: currentChunkZ };

    const neededChunks = new Set<string>();

    for (let x = -RENDER_DISTANCE; x <= RENDER_DISTANCE; x++) {
      for (let z = -RENDER_DISTANCE; z <= RENDER_DISTANCE; z++) {
        const cx = currentChunkX + x;
        const cz = currentChunkZ + z;
        const key = `${cx},${cz}`;
        neededChunks.add(key);

        if (!chunks[key] && !requestedChunks.current.has(key)) {
          requestedChunks.current.add(key);
          workerRef.current.postMessage({ chunkX: cx, chunkZ: cz });
        }
      }
    }

    Object.keys(chunks).forEach((key) => {
      if (!neededChunks.has(key)) {
        removeChunk(key);
        requestedChunks.current.delete(key);
      }
    });
  });

  return (
    <>
      {Object.entries(chunks).map(([key, blocks]) => {
        const [cx, cz] = key.split(",").map(Number);
        return (
          <WorldChunk 
            key={key} 
            position={[cx * CHUNK_SIZE, 0, cz * CHUNK_SIZE]} 
            blocks={blocks} 
          />
        );
      })}
    </>
  );
}
