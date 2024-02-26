import { create } from "zustand";

export const useModal = create((set) => ({
  totalModal: false,
  configModal: false,
  aboutModal: false,
  setTotalModal: (e) => set(() => ({ totalModal: e })),
  setConfigModal: (e) => set(() => ({ configModal: e })),
  setAboutModal: (e) => set(() => ({ aboutModal: e })),
}));
