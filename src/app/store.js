import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from "../features/account/accountSlice";
import recipeReducer from "../features/recipe/recipeSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default configureStore({
  reducer: {
    accounts: accountsReducer,
    recipes: recipeReducer,
  },
  enhancers: composeEnhancers,
});
