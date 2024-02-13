import { create } from "zustand";

export const useModal = create((set) => ({
  totalModal: false,
  setTotalModal: (e) => set(() => ({ totalModal: e })),
}));
