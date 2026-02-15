import { create } from "zustand";

const getUserId = () => {
  const u = JSON.parse(localStorage.getItem("user") || "null");
  return u?._id || "guest";
};

const loadCart = () => {
  const uid = getUserId();
  return JSON.parse(localStorage.getItem("cart_" + uid) || "[]");
};

export const useCart = create((set) => ({
  cart: loadCart(),

  add: (p) =>
    set((state) => {
      const uid = getUserId();
      const updated = [...state.cart, p];
      localStorage.setItem("cart_" + uid, JSON.stringify(updated));
      return { cart: updated };
    }),

  // 🔥 REMOVE BY INDEX (not by _id)
  remove: (index) =>
    set((state) => {
      const uid = getUserId();
      const updated = [...state.cart];
      updated.splice(index, 1); // remove ONLY that item
      localStorage.setItem("cart_" + uid, JSON.stringify(updated));
      return { cart: updated };
    }),

  clear: () =>
    set(() => {
      const uid = getUserId();
      localStorage.removeItem("cart_" + uid);
      return { cart: [] };
    }),

  reload: () => set({ cart: loadCart() }),
}));
