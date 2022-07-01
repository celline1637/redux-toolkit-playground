import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import CartItem from "./CartItem";
import { clearCart, calcTotal } from "../redux/feature/cart/cartSlice";
import { useEffect } from "react";

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, total, amount } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calcTotal());

    console.log(cartItems);
  }, [cartItems, dispatch]);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
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
        <div className="cart-total">
          <h4>
            total
            <span>{total}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
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
