import { create } from 'zustand';
import toast from "react-hot-toast";
import _ from "lodash";
type UserStore = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  uploadAvatar: (avatar: string, user: UserInfo | null) => Promise<void>;
  update: (data: UserInfo, user: UserInfo | null) => Promise<void>;
  clearUser: () => void;
  changePassword: (password: string, user: UserInfo | null) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  uploadAvatar: async (avatar: string, user) => {
    if (_.isEmpty(user)) { return }
    try {
      const requestAccounts = await fetch(`/api/s/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar})
      })
      const { message, user: newUser } = (await requestAccounts.json());
      if(!requestAccounts.ok) throw new Error(message)
      toast.success(message);
      set({user: newUser});
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
  update: async (data: UserInfo, user) => {
    if (_.isEmpty(user)) { return }
    try {
      const requestAccounts = await fetch(`/api/s/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const { message, user: newUser } = (await requestAccounts.json());
      if(!requestAccounts.ok) throw new Error(message)
      toast.success(message);
      set({user: newUser});
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
  changePassword: async (password: string, user: UserInfo | null) => {
    if (_.isEmpty(user)) { return }
    try {
      const requestAccounts = await fetch(`/api/s/user/password/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password})
      })
      const { message, user: newUser } = (await requestAccounts.json());
      if(!requestAccounts.ok) throw new Error(message)
      toast.success(message);
      set({user: newUser});
    } catch (e) {
      toast.error((e as Error).message);
    }
  },
  clearUser: () => set({ user: null }),
}));