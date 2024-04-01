import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	id: number | null;
	name: string | null;
	email: string | null;
}

interface AuthState {
	user: UserState;
}

const storedUserString = localStorage.getItem('user');
const storedUser: UserState | null = storedUserString ? JSON.parse(storedUserString) : null;

const initialState: AuthState = {
	user: storedUser || { id: null, name: null, email: null }
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_USER: (state, action) => {
			state.user = { ...action.payload };
		}
	}
});

export const { SET_USER } = authSlice.actions;

export default authSlice.reducer;
