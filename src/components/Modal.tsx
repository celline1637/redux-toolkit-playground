import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { clearCart } from "../redux/feature/cart/cartSlice";
import { toggleModal } from "../redux/feature/modal/modalSlice";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { amount } = useAppSelector((store) => store.cart);
  const { isOpen } = useAppSelector((store) => store.modal);

  const _toggleModal: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(toggleModal());
  };

  const _clearCart: React.MouseEventHandler = (e) => {
    if (amount === 0) return;
    dispatch(clearCart());
    _toggleModal(e);
  };

  return isOpen ? (
    <aside className="modal-container" onClick={_toggleModal}>
      <div className="modal">
        <h4>remove all items from your shopping cart? </h4>
        <div className="btn-container">
          <button className="btn confirm-btn" onClick={_clearCart}>
            confirm
          </button>
          <button className="btn cancel-btn" onClick={_toggleModal}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  ) : null;
};

export default Modal;
