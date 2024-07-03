import { RootState, store } from '../store';
import { fetchCategories } from './siteSlice';

export const selectCategories = (state: RootState) => {
	if (!state.site.categories.length && state.site.status !== 'loading') {
		store.dispatch(fetchCategories());
	} else {
		return state.site.categories;
	}
};

export const selectIsLoading = (state: RootState) => {
	return state.site.is_loading;
};
