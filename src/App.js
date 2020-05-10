import React from 'react';
import './App.css';
import {Register} from "./features/account/Register";
import NavigationMenu from "./features/navigation/Menu";
import {Login} from "./features/account/Login";
import {Provider} from "react-redux";
import store from "./app/store";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {createBrowserHistory} from "history";
import {FilteredRecipes} from "./features/recipesFilter/FilteredRecipes";
import {RecipesPreview} from "./features/recipe/RecipesPreview";
import {AccountsPreview} from "./features/account/AccountsPreview";
import {CreateRecipe} from "./features/recipe/CreateRecipe";
import {RecipePreview} from "./features/recipe/RecipePreview";

export const history = createBrowserHistory();

history.push("/login");
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationMenu/>
                <div className="App">
                    <Switch>
                        <Route path="/recipePreview" >
                            <RecipePreview />
                        </Route>
                        <Route exact path="/login" >
                            <Login/>
                        </Route>
                        <Route exact path="/register" >
                            <Register />
                        </Route>
                        <Route path="/addRecipe" >
                            <CreateRecipe />
                        </Route>
                        <Route exact path="/filteredRecipes" >
                            <FilteredRecipes />
                        </Route>
                        <Route exact path="/fullRecipesList" >
                            <RecipesPreview />
                        </Route>
                        <Route exact path="/fullAccountsList" >
                            <AccountsPreview />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
);
}

export default App;
