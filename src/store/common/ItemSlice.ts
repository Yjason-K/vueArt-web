import { StateCreator } from 'zustand';

export interface Item {
  id: string;
  category: string; // 카테고리 타입 분리 필요.
  title: string;
  description: string;
  duration: number;
  price: number;
}

export interface ItemSlice {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Item) => void;
}

export const ItemSlice: StateCreator<ItemSlice, [], []> = (set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateItem: (id, item) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? item : i)),
    })),
});
