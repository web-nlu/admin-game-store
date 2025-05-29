import {create} from "zustand/index";

type FilterOrder = {
  params: {[key: string]: string};
  page: number;
  setParams: (params: {[key: string]: string}) => void;
  setPage: () => void;
  clearParams: () => void;
};

export const filterOrderStore = create<FilterOrder>((set) => ({
  params: {
    size: "20"
  },
  page: 1,
  setParams: (params) => set({ params, page: 1 }),
  clearParams: () => set({ params: {} }),
  setPage: () => set((state)=> ({ page: state.page + 1 }))
}));

