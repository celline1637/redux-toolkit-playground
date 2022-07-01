import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CartItem } from '../../../interface/cartItem';
import axios from 'axios';
import { toggleModal } from '../modal/modalSlice';

const url = 'https://course-api.com/react-useReducer-cart-project';

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
}

export const getCartItems = createAsyncThunk<CartItem[]>(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      // 전체 store에 접근 가능
      // console.log(thunkAPI.getState());
      // 해당 파일의 slice 외에도 모든 reducer를 실행 할 수 있음
      // thunkAPI.dispatch(toggleModal());
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      // 해당 메세지를 payload로 받을 수 있음
      return thunkAPI.rejectWithValue('💩 something went wrong');
    }
  }
);

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
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
  extraReducers(builder) {
    builder
      .addCase(getCartItems.pending, (cartState, _) => {
        cartState.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (cartState, action) => {
        cartState.isLoading = false;
        cartState.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (cartState, action) => {
        console.log(action.payload);
        cartState.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calcTotal } =
  cartSlice.actions;

export const selectCartItemsCount = (state: RootState) => state.cart.amount;

export default cartSlice.reducer;
