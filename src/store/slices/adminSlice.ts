import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	authorizationToken: string | null;
}

const initialState: AuthState = {
	authorizationToken: null,
};

const authSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		login(state, action: PayloadAction<string>) {
			state.authorizationToken = action.payload;
		},
		logout(state) {
			state.authorizationToken = null;
		},
	},
});

export default authSlice;
