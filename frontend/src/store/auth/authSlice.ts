import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	id: number | null;
	username: string | null;
	email: string | null;
	token: any;
}

const initialState: AuthState = {
	id: null,
	username: null,
	email: null,
	token: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.id = action.payload.id;
		}
	}
});

export default authSlice.reducer;
