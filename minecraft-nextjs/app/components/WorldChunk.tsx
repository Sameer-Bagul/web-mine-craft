"use client";

import { useRef, useMemo } from "react";
import { InstancedMesh, Object3D } from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const BLOCK_SIZE = 1;

interface WorldChunkProps {
  position?: [number, number, number];
  blocks: [number, number, number][];
}

export default function WorldChunk({ position = [0, 0, 0], blocks }: WorldChunkProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  // Update instanced mesh positions based on blocks passed from Worker
  useMemo(() => {
    if (!meshRef.current) return;
    blocks.forEach((block, i) => {
      dummy.position.set(block[0], block[1], block[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [blocks, dummy]);

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        {blocks.map((block, i) => (
          <CuboidCollider key={i} args={[BLOCK_SIZE / 2, BLOCK_SIZE / 2, BLOCK_SIZE / 2]} position={block} />
        ))}
        <instancedMesh
          ref={meshRef}
          args={[undefined, undefined, blocks.length]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
          <meshStandardMaterial color="#4ade80" />
        </instancedMesh>
      </RigidBody>
    </group>
  );
}
