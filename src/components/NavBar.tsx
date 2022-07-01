import { CartIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toggleModal } from "../redux/feature/modal/modalSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { amount } = useAppSelector((store) => store.cart);

  const _toggleModal = () => dispatch(toggleModal());

  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <button onClick={_toggleModal}>
            <CartIcon />
            <div className="amount-container">
              <p className="total-amount">{amount}</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
