import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showOverlay: false,
  overlayText: null,
  onConfirm: () => {},
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    setOverlay: (state, action) => {
      state.showOverlay = true;
      state.overlayText = action.payload.text;
      state.onConfirm = action.payload.onConfirm;
    },
    closeOverlay: (state) => {
      state.showOverlay = false;

      state.overlayText = null;
      state.onConfirm = () => {};
    },
  },
});

// export const { openOverlay, closeOverlay } = overlaySlice.actions;
export const { setOverlay, closeOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;
