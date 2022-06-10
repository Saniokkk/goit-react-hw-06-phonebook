import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './reducers/contactsReducer';

export const store = configureStore({
    reducer: {
        contacts :contactsReducer,
    },
})