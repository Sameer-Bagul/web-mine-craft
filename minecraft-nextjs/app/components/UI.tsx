"use client";

import { useStore } from "../store/useStore";

export default function UI() {
  const inventory = useStore((state) => state.inventory);
  const selectedBlock = useStore((state) => state.selectedBlock);

  return (
    <>
      {/* Crosshair */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-1 h-4 bg-white/80 absolute"></div>
        <div className="w-4 h-1 bg-white/80 absolute"></div>
      </div>

      {/* Hotbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 p-2 rounded-lg z-10">
        {inventory.map((block, i) => (
          <div
            key={i}
            className={`w-12 h-12 border-2 flex items-center justify-center text-white font-bold
              ${selectedBlock === block ? "border-white bg-white/20" : "border-gray-500 bg-black/50"}`}
          >
            {block}
          </div>
        ))}
      </div>
    </>
  );
}
