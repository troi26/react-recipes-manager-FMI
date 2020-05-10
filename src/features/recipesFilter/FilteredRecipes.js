import React from "react";
import moment from "moment";
import {Button, Card, Grid, GridColumn, Image} from "semantic-ui-react";

export const FilteredRecipes = (props) => {
    const filteredRecipes = props.recipes.filter(rec => rec.keywords.some(kw => props.filter.keywords.includes(kw)) &&
        rec.authorId === props.filter.authorId)
        .sort((rec1, rec2) => moment(rec1.shareTime).diff(moment(rec2.shareTime), 'seconds') > 0);
    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <h1>Recipes</h1>
            <Grid columns={5}>
                { filteredRecipes.map(rec =>
                    <GridColumn key={`recipe_${rec.id}`}>
                        <Card centered>
                            <Image src={rec.photoPath} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{rec.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{`Shared at ${moment(rec.shareTime).format("YYYY-MM-DD HH:mm")}`}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {rec.detailedDescription.substr(0, 150) + "..."}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
}

FilteredRecipes.defaultProps = {
    recipes: [{
        id: 'recipe_1',
        name: 'Recipe 1',
        authorId: "user_1",
        photoPath: "https://assets.epicurious.com/photos/5c191ba17daf685c6d771aad/master/pass/DECEMBER-SMALL-PLATES--Sausage-Sheet-Pan-Dinner-W-Potatoes-and-Hearty-Greens-13122018.jpg",
        detailedDescription: "Recipe 1 detailed description with a long text in it for now to test it.",
        shareTime: moment().add(2, 'hours'),
        keywords: ["salad", "vegan"],
    }, {
        id: 'recipe_2',
        name: 'Recipe 2',
        authorId: "user_3",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: ["meat", "meal"],
    }, {
        id: 'recipe_3',
        name: 'Recipe 3',
        authorId: "user_1",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: ["meat", "meal"],
    }, {
        id: 'recipe_4',
        name: 'Recipe 4',
        authorId: "user_3",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: ["meat", "meal"],
    }, {
        id: 'recipe_5',
        name: 'Recipe 5',
        authorId: "user_2",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: ["meat", "meal"],
    }, {
        id: 'recipe_6',
        name: 'Recipe 6',
        authorId: "user_1",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: ["meat", "meal"],
    }, {
        id: 'recipe_7',
        name: 'Recipe 7',
        authorId: "user_2",
        photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
        detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
        shareTime: moment(),
        keywords: [],
    }],
    filter: {
        keywords: ["meat", "salad", "meal", "vegan"],
        authorId: "user_1",
    }
}