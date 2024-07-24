import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	user: UserType;
}

const storedUserString = localStorage.getItem('user');
const storedUser: UserType | null = storedUserString
	? JSON.parse(storedUserString)
	: null;

const initialState: AuthState = {
	user: storedUser || { id: null, name: null, email: null, token: null },
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_USER: (state, action) => {
			state.user = { ...action.payload };
		},
	},
});

export const { SET_USER } = authSlice.actions;

export default authSlice.reducer;
