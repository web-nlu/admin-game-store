import {create} from "zustand/index";

type FilterOrder = {
  params: {[key: string]: string};
  setParams: (params: {[key: string]: string}) => void;
  clearParams: () => void;
};

export const filterOrderStore = create<FilterOrder>((set) => ({
  params: {},
  setParams: (params) => set({ params }),
  clearParams: () => set({ params: {} }),
}));

