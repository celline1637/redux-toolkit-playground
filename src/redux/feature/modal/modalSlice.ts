import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (modalState) => {
      modalState.isOpen = !modalState.isOpen;
    },
    openModal: (modalState) => {
      modalState.isOpen = true;
    },
    closeModal: (modalState) => {
      modalState.isOpen = false;
    },
  },
});

export const { toggleModal, openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
