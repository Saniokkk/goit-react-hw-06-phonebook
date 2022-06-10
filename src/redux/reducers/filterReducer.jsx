import { createReducer } from "@reduxjs/toolkit";
import { filterContacts } from 'redux/actions/contactsAction';

const filterReducer = createReducer('',{
    [filterContacts]: (state, action) => {
        return action.payload;
    }
})

export default filterReducer;