import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
	authorization: boolean;
	image: boolean;
}

const initialState: ModalState = {
	authorization: false,
	image: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModalVisibility(state, action: PayloadAction<{ name: keyof ModalState; visibility: boolean }>) {
			state[action.payload.name] = action.payload.visibility;
		},
		closeAllModals(state) {
			for (const modal of Object.keys(state)) {
				state[modal as keyof ModalState] = false;
			}
		},
	},
});

export default modalSlice;
