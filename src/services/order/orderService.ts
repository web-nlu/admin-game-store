import {create} from "zustand/index";
import _ from "lodash";

type OrderStore = {
  orders: Order[];
  loading: boolean;
  hasMore: boolean;
  filterOrders: (params: {[key: string]: string}) => Promise<void>;
  clearOrders: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  hasMore: true,
  filterOrders: async (params: {[key: string]: string}) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`/api/orders?${searchParams}`);
    const { orders } = await res.json();
    const size= parseInt(params["size"] || "20");
    if(_.isEmpty(params["page"]) || params["page"] === "1") {
      set({orders, hasMore: orders.length === size});
      return;
    }
    set((state) => ({orders: [...state.orders, ...orders], hasMore: orders.length === size}));
  },
  clearOrders: () => set({orders: [], hasMore: true}),
}))