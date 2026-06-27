import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

const CHUNK_SIZE = 16;
const MAX_HEIGHT = 10;

self.onmessage = (e: MessageEvent) => {
  const { chunkX, chunkZ } = e.data;
  
  const startX = chunkX * CHUNK_SIZE;
  const startZ = chunkZ * CHUNK_SIZE;

  const blocks: [number, number, number][] = [];

  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      const worldX = startX + x;
      const worldZ = startZ + z;
      
      let h = noise2D(worldX * 0.05, worldZ * 0.05);
      h = Math.floor((h + 1) / 2 * MAX_HEIGHT);

      // We only generate the top layer blocks for now to save massive performance and prevent lag
      blocks.push([x, h, z]);
    }
  }

  // Post the generated blocks back to the main thread
  self.postMessage({ chunkX, chunkZ, blocks });
};
