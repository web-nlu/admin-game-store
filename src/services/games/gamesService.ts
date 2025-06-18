// store/gameStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";

type GameStore = {
  games: Game[];
  loading: boolean;
  getGames: (categoryId: string) => Promise<void>;
  updateGame: (categoryId: number, game: Game[]) => Promise<void>;
  deleteGame: (id: number) => Promise<void>;
  clearGame: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  loading: false,

  getGames: async (categoryId: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/games/${categoryId}`, { cache: 'no-store' });
      const data = await res.json();
      set({ games: data.games });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },
  updateGame: async (categoryId: number, data: Game[]) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/games/${categoryId}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const {games, message} = await res.json();

      if (!res.ok) throw new Error(message);
      set({games: games})
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  deleteGame: async (id: number) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/games/delete/${id}`, {
        method: 'DELETE'
      });
      const {message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        games: state.games.filter((cat) => cat.id !== id)
      }));
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },
  clearGame: () => set({ loading: false, games: [] })
}));
