import { ChevronDown, ChevronUp } from "../icons";
import { CartItem as propTypes } from "../interface/cartItem";
import { useAppDispatch } from "../hooks/useRedux";
import {
  increase,
  removeItem,
  decrease,
} from "../redux/feature/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount }: propTypes) => {
  const dispatch = useAppDispatch();

  const _removeItem = () => dispatch(removeItem(id));
  const _increase = () => dispatch(increase(id));
  const _decrease = () => {
    if (amount === 1) return dispatch(removeItem(id));
    dispatch(decrease(id));
  };

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price}</h4>
        <button className="remove-btn" onClick={_removeItem}>
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={_increase}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={_decrease}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
