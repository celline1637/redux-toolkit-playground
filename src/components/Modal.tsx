import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toggleModal } from "../redux/feature/modal/modalSlice";
const Modal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((store) => store.modal);

  const _toggleModal: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(toggleModal());
  };

  return isOpen ? (
    <aside className="modal-container" onClick={(e) => _toggleModal(e)}>
      <div className="modal">
        <h4>remove all items from your shopping cart? </h4>
        <div className="btn-container">
          <button className="btn confirm-btn" onClick={_toggleModal}>
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
