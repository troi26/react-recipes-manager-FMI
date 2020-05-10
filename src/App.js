import React, {Component, useEffect} from 'react';
import './App.css';
import {Register} from "./features/account/Register";
import NavigationMenu from "./features/navigation/Menu";
import {Login} from "./features/account/Login";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {createBrowserHistory} from "history";
import {FilteredRecipes} from "./features/recipesFilter/FilteredRecipes";
import {RecipesPreview} from "./features/recipe/RecipesPreview";
import {AccountsPreview} from "./features/account/AccountsPreview";
import {CreateRecipe} from "./features/recipe/CreateRecipe";
import {RecipePreview} from "./features/recipe/RecipePreview";
import {loadFromStorage, selectLogged} from "./features/account/accountSlice";
import {loadFromStorage as loadFromRecipesStorage} from "./features/recipe/recipeSlice";

export const history = createBrowserHistory();

const App = () => {

    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();

    const startupLoad = () => {
        dispatch(loadFromStorage());
        dispatch(loadFromRecipesStorage());
    };

    return (
        <AppContent logged={logged} startupLoad={startupLoad}/>
    );
}

class AppContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.startupLoad();
    }

    render () {
        return (
            <BrowserRouter>
                <NavigationMenu/>
                <div className="App">
                    <Switch>
                        <Route exact path="/" >
                            {this.props.logged ? <AccountsPreview /> : <Login />}
                        </Route>
                        <Route exact path="/recipePreview/:recipeId" >
                            {this.props.logged ? <RecipePreview /> : <Redirect to={"/login"} />}
                            {/*<RecipePreview />*/}
                        </Route>
                        <Route exact path="/userEdit/:userId">
                            {this.props.logged ? <Register /> : <Redirect to={"/login"} />}
                            {/*<Register />*/}
                        </Route>
                        <Route exact path="/login">
                            {this.props.logged ? <Redirect to={"/fullAccountsList"} /> : <Login />}
                            {/*<Login />*/}
                        </Route>
                        <Route exact path="/register" >
                            {!this.props.logged ? <Register /> : <Redirect to={"/fullAccountsList"} />}
                        </Route>
                        <Route exact path="/addRecipe" >
                            {this.props.logged ? <CreateRecipe /> : <Redirect to={"/login"} />}
                            {/*<CreateRecipe />*/}
                        </Route>
                        <Route exact path="/recipeEdit/:recipeId">
                            {this.props.logged ? <CreateRecipe /> : <Redirect to={"/login"} />}
                            {/*<CreateRecipe />*/}
                        </Route>
                        <Route exact path="/filteredRecipes" >
                            {this.props.logged ? <FilteredRecipes /> : <Redirect to={"/login"} />}
                            {/*<FilteredRecipes />*/}
                        </Route>
                        <Route exact path="/fullRecipesList" >
                            {this.props.logged ? <RecipesPreview /> : <Redirect to={"/login"} />}
                            {/*<RecipesPreview />*/}
                        </Route>
                        <Route exact path="/fullAccountsList" >
                            {this.props.logged ? <AccountsPreview /> : <Redirect to={"/login"} />}
                            {/*<AccountsPreview />*/}
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>);
    }
}

export default App;
