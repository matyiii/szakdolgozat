import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	id: number | null;
	username: string | null;
	email: string | null;
	token: any;
}

interface AuthState {
	user: UserState;
}

const initialState: AuthState = {
	user: {
		id: null,
		username: null,
		email: null,
		token: null
	}
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_USER: (state, action) => {
			state.user = action.payload.user;
		}
	}
});

export default authSlice.reducer;
