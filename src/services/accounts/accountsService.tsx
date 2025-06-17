// store/accountStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";

type AccountStore = {
  accounts: Account[];
  loading: boolean;
  totalAccounts: number;
  getAccounts: () => Promise<void>;
  createAccount: (account: BodySetAccount) => Promise<void>;
  updateAccount: (id: number, formData: BodySetAccount) => Promise<void>;
  deleteAccount: (id: number) => Promise<void>;
  filter: (params: {[key: string]: string}) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<boolean>;
};

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  loading: false,
  totalAccounts: 0,
  updateStatus: async (id: string, status: string)=> {
    set({loading: true});
    try {
      const requestAccounts = await fetch(`/api/accounts/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
      })
      const { message } = (await requestAccounts.json());
      toast.success(message);
      set({loading: false});
      return true;
    } catch (e) {
      toast.error((e as Error).message);
      set({loading: false});
      return false;
    }
  },
  filter: async (params: {[key: string]: string})=> {
    set({ loading: true });
    try {
      const requestAccounts = await fetch(`/api/accounts?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const { content: accounts, totalElements } = (await requestAccounts.json());
      set({accounts: accounts || [], totalAccounts: totalElements});
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      set({ loading: false });
    }

  },

  getAccounts: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/accounts`, { cache: 'no-store' });
      const data = await res.json();
      set({ accounts: data.accounts });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  createAccount: async (formData: BodySetAccount) => {
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      salePrice: parseFloat(formData.salePrice) || 0,
      level: parseInt(formData.level) || 0,
      features: formData.features.filter(f => f.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };
    try {
      const res = await fetch(`/api/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      const {account, message} = await res.json();
      if (!res.ok) throw new Error(message);
      window.location.href = `/san-pham/${account.id}`
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    }
  },
  updateAccount: async (id: number, formData: BodySetAccount) => {
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      salePrice: parseFloat(formData.salePrice) || 0,
      level: parseInt(formData.level) || 0,
      features: formData.features.filter(f => f.trim() !== ''),
      tags: formData.tags.filter(t => t.trim() !== '')
    };
    set({ loading: true });
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const { message} = await res.json();

      if (!res.ok) throw new Error(message);
      toast.success("Cập nhật thành công")
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  deleteAccount: async (id: number) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: 'DELETE'
      });
      const {message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        accounts: state.accounts.filter((acc) => acc.id !== id)
      }));
      toast.success("Xoá thành công")
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  }
}));
