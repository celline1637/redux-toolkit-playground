import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import CartItem from './CartItem';
import {
  clearCart,
  calcTotal,
  getCartItems,
} from '../redux/feature/cart/cartSlice';
import { useEffect } from 'react';

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, total, amount, isLoading } = useAppSelector(
    (store) => store.cart
  );

  useEffect(() => {
    dispatch(getCartItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) return;
    dispatch(calcTotal());
  }, [cartItems, dispatch]);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total
            <span>{total}</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
