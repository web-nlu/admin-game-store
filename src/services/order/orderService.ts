import {create} from "zustand/index";
import _ from "lodash";

type OrderStore = {
  orders: Order[];
  loading: boolean;
  hasMore: boolean;
  params: {[key: string]: string};
  page: number;
  filterOrders: (params: {[key: string]: string}) => Promise<void>;
  clearOrders: () => void;
  setPage: () => void;
  setParams: (params: {[key: string]: string}) => void;
  clearParams: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  hasMore: true,
  params: {
    size: "20"
  },
  page: 1,
  filterOrders: async (params: {[key: string]: string}) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`/api/orders?${searchParams}`);
    const { orders } = await res.json();
    const size= parseInt(params["size"] || "20");
    if(_.isEmpty(params["page"]) || params["page"] === "1") {
      set({orders, hasMore: orders.length === size, page: 1, params: {size: "20"}});
      return;
    }
    set((state) => ({orders: [...state.orders, ...orders], hasMore: orders.length === size}));
  },
  clearOrders: () => set({orders: [], hasMore: true}),
  setPage: () => set((state)=> ({ page: state.page + 1 })),
  setParams: (params: {[key: string]: string}) => set({params}),
  clearParams: () => set({params: {
    size: "20"
  }})
}))