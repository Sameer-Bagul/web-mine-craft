"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, useRapier, RapierRigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useStore } from "../store/useStore";

const SPEED = 5;
const JUMP_FORCE = 8;

// Hook to capture keyboard input
function usePlayerControls() {
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false);
    
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
}

export default function Player() {
  const body = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const keys = usePlayerControls();
  const setPosition = useStore((state) => state.setPosition);

  const direction = new Vector3();
  const frontVector = new Vector3();
  const sideVector = new Vector3();

  useFrame(() => {
    if (!body.current) return;

    // Movement logic
    const { KeyW, KeyS, KeyA, KeyD, Space } = keys.current;

    frontVector.set(0, 0, (KeyS ? 1 : 0) - (KeyW ? 1 : 0));
    sideVector.set((KeyA ? 1 : 0) - (KeyD ? 1 : 0), 0, 0);

    // Make movement relative to camera direction
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // Apply movement
    const linvel = body.current.linvel();
    body.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

    // Failsafe: if player falls out of the world while chunks are loading, teleport them back up
    const pos = body.current.translation();
    if (pos.y < -10) {
      body.current.setTranslation({ x: 0, y: 20, z: 0 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }

    // Jumping
    if (Space && Math.abs(linvel.y) < 0.1) {
      body.current.setLinvel({ x: linvel.x, y: JUMP_FORCE, z: linvel.z }, true);
      keys.current.Space = false; // Prevent holding space to fly
    }

    // Update camera position to follow player (first person view)
    camera.position.set(pos.x, pos.y + 0.8, pos.z); // Offset camera slightly up for eye level
  });

  return (
    <RigidBody
      ref={body}
      position={[0, 20, 0]}
      mass={1}
      type="dynamic"
      colliders="cuboid"
      enabledRotations={[false, false, false]} // Stop player from falling over
    />
  );
}
