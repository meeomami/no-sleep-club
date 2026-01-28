import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
	url: string | null;
}

const initialState: ImageState = {
	url: null,
};

const imageSlice = createSlice({
	name: "image",
	initialState,
	reducers: {
		setImageUrl(state, action: PayloadAction<string | null>) {
			state.url = action.payload;
		},
	},
});

export default imageSlice;
