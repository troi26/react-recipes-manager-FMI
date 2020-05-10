import { createSlice } from '@reduxjs/toolkit';
import {getStore, getStoreSlice} from "../storage/localeStorageAPI";

const store = getStore();
export const accountsSlice = createSlice({
  name: 'account',
  initialState: {
    users: [],
    logged: null,
    registered: 0,
    errors: {
      login: null,
      register: null,
    },
  },
  reducers: {
    loadFromStorage: (state) => {
      const usersStore = getStoreSlice("Users");

      state.users = usersStore.data;
      state.registered = usersStore.data.length;
      state.logged = usersStore.logged;
    },
    login: (state, action) => {
      // if () {
      //   users.find();
      // }
    },
  },
});

export const { loadFromStorage } = accountsSlice.actions;

export default accountsSlice.reducer;
