import create from 'zustand';
import { devtools } from 'zustand/middleware';

export type DrawerState = {
  drawerOpened: boolean;
  setDrawerOpened(opened: boolean): Promise<void>;
}

export const useDrawerState = create<DrawerState>(
  devtools(
    (set, get) => ({
      drawerOpened: false,
      setDrawerOpened: async (opened: boolean) => set(_state => ({ drawerOpened: opened }))
    })
    , { name: 'Drawer Store'}
  )
)