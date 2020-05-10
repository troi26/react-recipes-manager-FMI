import { createSlice } from '@reduxjs/toolkit';
import {getStore, getStoreSlice} from "../storage/localeStorageAPI";

const store = getStore();
export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    users: [],
    logged: null,
    registered: 0,
  },
  reducers: {
    loadFromStorage: (state) => {
      const usersStore = getStoreSlice("Users");

      state.users = usersStore.data;
      state.registered = usersStore.data.length;
      state.logged = usersStore.logged;
    },
  },
});

export const { loadFromStorage } = recipeSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
//
// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default recipeSlice.reducer;
