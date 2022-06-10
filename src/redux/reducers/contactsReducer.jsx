import { createReducer } from "@reduxjs/toolkit";
import { getFromStorage } from "components/storage";
import { addContacts, removeContacts } from "redux/actions/contactsAction";

const contactsReducer = createReducer(
    getFromStorage('contacts') ? getFromStorage('contacts') : [], {
    [addContacts]: (state, action) => {
        console.log(action)
        return [...state, action.payload];
    },
    [removeContacts]: (state, action) => {
        const contactList = Object.values(state);
        const filterContacts = contactList.filter(({ id }) => {
            return id !== action.payload;
        })
        return filterContacts;
    }
    
});

export default contactsReducer;