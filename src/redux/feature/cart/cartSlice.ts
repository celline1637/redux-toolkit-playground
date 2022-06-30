import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import cartItems from "../../../mock/data/cartItems";
import { CartItem } from "../../../interface/cartItem";

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      const itemId = payload;
      console.log(itemId);
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      if (cartItem) cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      console.log("ddd");
      const cartItem = state.cartItems.find((item) => item.id === payload);
      if (cartItem) cartItem.amount = cartItem.amount - 1;
    },
    calcTotal: (state) => {
      state.amount = state.cartItems.length;
    },
  },
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

export const selectCartItemsCount = (state: RootState) => state.cart.amount;

export default cartSlice.reducer;
