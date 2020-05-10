import { createSlice } from '@reduxjs/toolkit';
import {checkForStore, createStoreSlice, getStore, getStoreSlice} from "../storage/localeStorageAPI";
import moment from "moment";
import {accountStatuses} from "../account/model/User";

const storage = getStore();
export const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [/*{
      id: 'recipe_1',
      name: 'Recipe 1',
      authorId: "user_1",
      photoPath: "https://assets.epicurious.com/photos/5c191ba17daf685c6d771aad/master/pass/DECEMBER-SMALL-PLATES--Sausage-Sheet-Pan-Dinner-W-Potatoes-and-Hearty-Greens-13122018.jpg",
      shortDescription: "Recipe 1 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 1 detailed description with a long text in it for now to test it.",
      shareTime: moment().add(2, 'hours'),
      keywords: ["salad", "vegan"],
      products: ["onion"],
    }, {
      id: 'recipe_2',
      name: 'Recipe 2',
      authorId: "user_3",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 2 short description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.",
      detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: ["meat", "meal"],
      products: ["tomatoes"],
    }, {
      id: 'recipe_3',
      name: 'Recipe 3',
      authorId: "user_1",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 3 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 3 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: ["meat", "meal"],
      products: ["chicken meat"],
    }, {
      id: 'recipe_4',
      name: 'Recipe 4',
      authorId: "user_3",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 4 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 4 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: ["meat", "meal"],
      products: [],
    }, {
      id: 'recipe_5',
      name: 'Recipe 5',
      authorId: "user_2",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 5 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 5 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: ["meat", "meal"],
      products: [],
    }, {
      id: 'recipe_6',
      name: 'Recipe 6',
      authorId: "user_1",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 6 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 6 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: ["meat", "meal"],
      products: [],
    }, {
      id: 'recipe_7',
      name: 'Recipe 7',
      authorId: "user_2",
      photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
      shortDescription: "Recipe 7 short description with a long text in it for now to test it.",
      detailedDescription: "Recipe 7 detailed description with a long text in it for now to test it.",
      shareTime: moment(),
      keywords: [],
      products: [],
    }*/],
  },
  reducers: {
    loadFromStorage: (state) => {
      if (checkForStore("Recipes")) {
        const usersStore = getStoreSlice("Recipes");

        state.recipes = usersStore.recipes;
      } else {
        createStoreSlice("Recipes", state);
      }
    },
    shareRecipe: (state, details) => {
      details.payload.id = `recipe_${state.recipes.length.toString(19)}`;

      details.payload.shareTime = moment().toISOString();
      details.payload.modificationTime = moment().toISOString();

      console.log("REGISTER_USER", details.payload);

      state.recipes = state.recipes.concat([details.payload]);

      console.log(state.recipes);

      storage.set("Recipes", {
        recipes: state.recipes,
      })
    },
    recipeEdit: (state, details) => {
      console.log("EDIT_USER", details.payload);

      details.payload.modificationTime = moment().toISOString();

      state.recipes = state.recipes.filter(recipe => recipe.id !== details.payload.id).concat([details.payload]);

      storage.set("Recipes", {
        recipes: state.recipes,
      })
    },
    recipeRemove: (state, details) => {

      state.recipes = state.recipes.filter(recipe => recipe.id !== details.payload);

      storage.set("Recipes", {
        recipes: state.recipes,
      })
    },
  },
});

export const { loadFromStorage, shareRecipe, recipeEdit, recipeRemove } = recipeSlice.actions;

export const selectRecipes = state => state.recipes.recipes;

export default recipeSlice.reducer;
