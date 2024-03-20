import { configureStore } from '@reduxjs/toolkit'
import linkSlice from '../features/links/slice';
import { userSlice } from '../features/user/slice';

export const store = configureStore({
    reducer: {
        links: linkSlice,
        users: userSlice
    }
});

export default store;