// store/categoryStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";

type CategoryStore = {
  categories: Category[];
  loading: boolean;
  getCategories: () => Promise<void>;
  createCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: number, category: Omit<Category, 'id'>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,

  getCategories: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/categories`, { cache: 'no-store' });
      const data = await res.json();
      set({ categories: data.categories });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (category: Omit<Category, 'id'>) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });

      const {category: newCategory, message} = await res.json();

      if (!res.ok) throw new Error(message);

      // Thêm vào state hoặc gọi lại getCategories()
      set((state) => ({
        categories: [...state.categories, newCategory]
      }));
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },
  updateCategory: async (id: number, data: Omit<Category, 'id'>) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const {category, message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? {id, ...category} : cat
        )
      }));
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id: number) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });
      const {message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id)
      }));
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  }
}));
