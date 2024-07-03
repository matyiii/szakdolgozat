import DataService from '@/service/DataService';
import { CategoryType } from '@/shared';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SiteState {
    status: 'idle' | 'loading';
    categories: CategoryType[];
    is_loading: boolean;
}

const initialState: SiteState = {
    status: 'idle',
    categories: [],
    is_loading: false,
};

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        STATUS_IDLE: (state) => {
            state.status = 'idle';
        },
        STATUS_LOADING: (state) => {
            state.status = 'loading';
        },

        SET_CATEGORIES: (state, action) => {
            state.categories = action.payload;
        },

        SET_LOADER: (state, action) => {
            state.is_loading = action.payload;
        },
    },
});

export const fetchCategories = createAsyncThunk(
    'site/categories',
    async (_, thunkAPI) => {
        const site = (thunkAPI.getState() as RootState).site;
        if (site.status === 'loading' || Boolean(site.categories.length)) {
            return;
        }

        try {
            thunkAPI.dispatch(STATUS_LOADING());

            const response = await DataService.site.getCategories();

            if (response) {
                thunkAPI.dispatch(SET_CATEGORIES(response.data));
            }
        } catch (err) {
            console.log(err);
        } finally {
            thunkAPI.dispatch(STATUS_IDLE());
        }
    },
);

export const { STATUS_IDLE, STATUS_LOADING, SET_CATEGORIES, SET_LOADER } =
    siteSlice.actions;

export default siteSlice.reducer;
