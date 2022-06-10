import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './reducers/contactsReducer';
import filterReducer from './reducers/filterReducer';

export const store = configureStore({
    reducer: {        
        contacts: contactsReducer,
        filter: filterReducer,
    },
})