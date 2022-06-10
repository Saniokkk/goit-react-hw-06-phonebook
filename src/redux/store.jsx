import { configureStore, combineReducers } from '@reduxjs/toolkit'
import contactsReducer from './reducers/contactsReducer';
import filterReducer from './reducers/filterReducer';

const rootContactsReducer = combineReducers({
    items: contactsReducer,
    filter: filterReducer,
    })

export const store = configureStore({
    reducer: {
        contacts: rootContactsReducer,
    },
})