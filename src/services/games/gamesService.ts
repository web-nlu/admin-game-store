// store/gameStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";

type GameStore = {
  games: Game[];
  loading: boolean;
  getGames: (categoryId: string) => Promise<void>;
  createGame: (game: Omit<Game, 'id'>) => Promise<void>;
  updateGame: (id: number, game: Omit<Game, 'id'>) => Promise<void>;
  deleteGame: (id: number) => Promise<void>;
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

  createGame: async (game: Omit<Game, 'id'>) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
      });

      const {game: newGame, message} = await res.json();

      if (!res.ok) throw new Error(message);

      // Thêm vào state hoặc gọi lại getGames()
      set((state) => ({
        games: [...state.games, newGame]
      }));
      toast.success(message)
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },
  updateGame: async (id: number, data: Omit<Game, 'id'>) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/games/${id}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const {game, message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        games: state.games.map((cat) =>
          cat.id === id ? {id, ...game} : cat
        )
      }));
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
      const res = await fetch(`/api/games/${id}`, {
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
  }
}));
