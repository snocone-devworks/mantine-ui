import create from "zustand/react";

type DrawerState = {
  opened: boolean;
  setOpened(value: boolean): Promise<void>;
}

export const useDrawerState = create<DrawerState>(
  (set, get) => ({
    opened: false,
    setOpened: async (value: boolean) => {
      set({ opened: value });
    }
  })
)