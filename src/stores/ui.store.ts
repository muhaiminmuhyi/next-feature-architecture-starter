"use client"

import { create } from "zustand"

interface UiStoreState {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUiStore = create<UiStoreState>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}))
