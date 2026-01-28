import authSlice from "./slices/adminSlice";
import imageSlice from "./slices/imageSlice";
import modalSlice from "./slices/modalSlice";
import postSlice from "./slices/postSlice";

export default {
	...authSlice.actions,
	...modalSlice.actions,
	...imageSlice.actions,
	...postSlice.actions,
};
