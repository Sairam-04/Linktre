import { configureStore } from '@reduxjs/toolkit'
import linkSlice from '../features/links/slice';

export const store = configureStore({
    reducer: {
        links: linkSlice,
    }
});

export default store;