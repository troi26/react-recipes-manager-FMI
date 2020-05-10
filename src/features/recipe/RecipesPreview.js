import React from "react";
import moment from "moment";
import {Button, Card, Grid, GridColumn, Image} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {recipeRemove, selectRecipes} from "./recipeSlice";
import {roles} from "../account/model/User";
import {selectLogged} from "../account/accountSlice";

export const RecipesPreview = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(selectRecipes);
    const logged = useSelector(selectLogged);

  return (
      <div
          style={{
            margin: '0em 1em',
          }}
      >
        <h1>Recipes</h1>
        <Grid columns={5}>
          { recipes.map(rec =>
              <GridColumn key={`recipe_${rec.id}`}>
                <Card centered>
                  <Image src={rec.photoPath} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{rec.name}</Card.Header>
                    <Card.Meta>
                      <span className='date'>{`Shared on ${moment(rec.shareTime).format("YYYY-MM-DD HH:mm")}`}</span>
                    </Card.Meta>
                    <Card.Description>
                      {rec.detailedDescription.substr(0, 150) + "..."}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button primary><NavLink to={`/recipePreview/${rec.id}`} style={{color: 'white'}}>Read</NavLink></Button>
                      { (logged.id === rec.authorId || logged.role === roles.ADMIN ) &&
                          <React.Fragment>
                              <Button color={"red"} onClick={() => dispatch(recipeRemove(rec.id))}>Delete</Button>
                              <Button color={"green"}>
                                  <NavLink to={`/recipeEdit/${rec.id}`} style={{color: 'white'}}>Edit</NavLink>
                              </Button>
                          </React.Fragment>
                      }
                  </Card.Content>
                </Card>
              </GridColumn>
          )}
        </Grid>
      </div>
  );
}

RecipesPreview.defaultProps = {
    recipes: [],
}