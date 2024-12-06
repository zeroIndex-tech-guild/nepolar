import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '~/types/user'

type UserState = User

type UserActions = {
  setUser: (user: UserState) => void
  getUser: () => UserStore
}

type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      id: '',
      email: '',
      fullName: '',
      userName: '',
      createdAt: '',
      updatedAt: '',
      setUser: (user) => set(user),
      getUser: () => get(),
    }),
    {
      name: 'user',
    }
  )
)
