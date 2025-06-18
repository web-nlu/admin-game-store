// store/accountStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";

type AccountStore = {
  loading: boolean;
  getAccountInfo: (accountId: string) => Promise<void>;
  updateAccountInfo: (accountId: string, formData: AccountInfo) => Promise<void>;
  currentAccountInfo: AccountInfo;
  clearCurrent: () => void;
};

export const useAccountInfoStore = create<AccountStore>((set) => ({
  currentAccountInfo: {} as AccountInfo,
  loading: false,

  clearCurrent: () => set({ currentAccountInfo: {} as AccountInfo }),

  getAccountInfo: async (accountId: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/accountInfo/${accountId}`, { cache: 'no-store' });
      const data = await res.json();
      set({ currentAccountInfo: data.info || {} as AccountInfo });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  updateAccountInfo: async (accountId: string, formData: AccountInfo) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/accountInfo/${accountId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const { message, info } = await res.json();

      if (!res.ok) throw new Error(message);
      set({currentAccountInfo: info || {}})
      toast.success("Cập nhật thành công")
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

}));
