import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { User } from '~/types/user'

type UserState = User

type UserActions = {
  setUser: (user: UserState) => void
  getUser: () => UserStore
}

type UserStore = UserState & UserActions

export const userStore = createStore<UserStore>()(
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

export const userId = userStore.getState().getUser().id
