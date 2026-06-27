import { create } from 'zustand';

interface PlayerState {
  inventory: number[];
  selectedBlock: number;
  position: [number, number, number];
  chunks: Record<string, [number, number, number][]>;
  setPosition: (pos: [number, number, number]) => void;
  setSelectedBlock: (block: number) => void;
  addChunk: (key: string, blocks: [number, number, number][]) => void;
  removeChunk: (key: string) => void;
}

export const useStore = create<PlayerState>((set) => ({
  inventory: [1, 2, 3, 4, 5],
  selectedBlock: 1,
  position: [0, 20, 0],
  chunks: {},
  setPosition: (pos) => set({ position: pos }),
  setSelectedBlock: (block) => set({ selectedBlock: block }),
  addChunk: (key, blocks) => set((state) => ({ chunks: { ...state.chunks, [key]: blocks } })),
  removeChunk: (key) => set((state) => {
    const newChunks = { ...state.chunks };
    delete newChunks[key];
    return { chunks: newChunks };
  }),
}));
