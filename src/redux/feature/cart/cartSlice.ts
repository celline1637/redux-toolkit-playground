import { createSlice, current } from "@reduxjs/toolkit";
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
    clearCart: (cartState) => {
      cartState.cartItems = [];
      cartState.amount = 0;
    },
    removeItem: (cartState, { payload }) => {
      const itemId = payload;
      console.log(itemId);
      cartState.cartItems = cartState.cartItems.filter(
        (item) => item.id !== itemId
      );
    },
    increase: (cartState, { payload }) => {
      const cartItem = cartState.cartItems.find((item) => item.id === payload);
      if (cartItem) cartItem.amount = cartItem.amount + 1;
    },
    decrease: (cartState, { payload }) => {
      const cartItem = cartState.cartItems.find((item) => item.id === payload);
      if (cartItem) cartItem.amount = cartItem.amount - 1;
    },
    calcTotal: (cartState) => {
      const selectedPrice = cartState.cartItems.map(
        (item) => item.amount * Number(item.price)
      );
      const selectedItemsCount = cartState.cartItems.map((item) => item.amount);
      cartState.total = selectedPrice.reduce((acc, curr) => acc + curr, 0);
      cartState.amount = selectedItemsCount.reduce(
        (acc, curr) => acc + curr,
        0
      );
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calcTotal } =
  cartSlice.actions;

export const selectCartItemsCount = (state: RootState) => state.cart.amount;

export default cartSlice.reducer;
