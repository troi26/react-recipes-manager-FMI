import { configureStore } from '@reduxjs/toolkit';
import {accountsSlice} from "../features/account/accountSlice";
import {recipeSlice} from "../features/recipe/recipeSlice";

import {compose} from "redux";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;

export default configureStore({
  reducer: {
    accounts: accountsSlice,
    recipes: recipeSlice,
  },
  enhancers: composeEnhancers,
});
