import {create} from "zustand/index";

type CurrentOrder = {
  order: Order | null;
  setCurrentOrder: (order: Order) => void;
  clear: () => void;
};

export const useCurrentOrderStore = create<CurrentOrder>((set) => ({
  order: null,
  setCurrentOrder: (order) => set({ order }),
  clear: () => set({ order: null }),
}));

