import { createAction } from "@reduxjs/toolkit";


export const addContacts = createAction('contacts/addContact');
export const removeContacts = createAction('contacts/removeContact');
export const filterContacts = createAction('filter/filterContacts')