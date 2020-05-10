import { createSlice } from '@reduxjs/toolkit';
import {checkForStore, createStoreSlice, getStore, getStoreSlice} from "../storage/localeStorageAPI";
import {accountStatuses, genders, roles} from "./model/User";
import moment from "moment";

const storage = getStore();
export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    users: [],
    logged: null,
    registered: 0,
    loginError: "",
  },
  reducers: {
    loadFromStorage: (state) => {
      if (checkForStore("Users")) {
        const usersStore = getStoreSlice("Users");
        state.users = usersStore.users;
        state.registered = usersStore.users.length;
        state.logged = usersStore.logged;
      } else {
        createStoreSlice("Users", state);
      }
    },
    registerUser: (state, details) => {
      console.log(state.users);
      details.payload.id = `user_${state.users.length.toString(19)}`;
      details.payload.status = accountStatuses.ACTIVE;
      details.payload.registrationDate = moment().toISOString();
      details.payload.modificationDate = moment().toISOString();

      console.log("REGISTER_USER", details.payload);

      state.users = state.users.concat([details.payload]);
      state.registered += 1;
      state.logged = details.payload;

      console.log(state.users);

      storage.set("Users", {
        users: state.users,
        logged: state.logged,
        registered: state.registered,
      })
    },
    userEdit: (state, details) => {
      console.log("EDIT_USER", details.payload);

      details.payload.modificationDate = moment().toISOString();

      state.users = state.users.filter(account => account.id !== details.payload.id).concat([details.payload]);

      storage.set("Users", {
        users: state.users,
        logged: state.logged,
        registered: state.registered,
      })
    },
    userRemove: (state, action) => {

      state.users = state.users.filter(user => user.id !== action.payload);
      state.registered -= 1;

      if (state.logged.id === action.payload) {
        state.logged = null;
        storage.set("Users", {
          users: state.users,
          logged: null,
          registered: state.registered,
        });
      } else {
        storage.set("Users", {
          users: state.users,
          logged: state.logged,
          registered: state.registered,
        });
      }

    },
    login: (state, action) => {
      const details = action.payload;
      const user = state.users.find(user => user.username === details.username &&
          user.password === details.password
      );

      if (user) {
        state.logged = user;
        state.loginError = null;

        console.log("LOGIN_STATE: ", action, state.logged, state.users);

        storage.set("Users", {
          users: state.users,
          logged: user,
          registered: state.registered,
        });
      } else {
        state.loginError = "Bad credentials";
      }
    },
    logout: (state, action) => {
      state.logged = null;

      storage.set("Users", {
        users: state.users,
        logged: null,
        registered: state.registered,
      });
    },
  },
});

export const { loadFromStorage, registerUser, userEdit, userRemove, login, logout } = accountsSlice.actions;

export const selectUsers = state => {
  return state.accounts.users;
}

export const selectLogged = state => {
  return state.accounts.logged;
}

export const selectLoginErrors = state => {
  return state.accounts.loginError;
}

export default accountsSlice.reducer;
