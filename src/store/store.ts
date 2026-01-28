import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/adminSlice";
import modalSlice from "./slices/modalSlice";
import imageSlice from "./slices/imageSlice";
import postSlice from "./slices/postSlice";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	modal: modalSlice.reducer,
	image: imageSlice.reducer,
	post: postSlice.reducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
