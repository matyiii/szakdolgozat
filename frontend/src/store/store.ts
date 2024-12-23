import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import siteReducer from '@/store/site/siteSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		site: siteReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
