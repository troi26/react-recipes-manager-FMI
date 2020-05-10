import React, {useState} from "react";
import moment from "moment";
import {Button, Card, Container, Dropdown, Grid, GridColumn, Image, Segment, Select} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {selectRecipes} from "../recipe/recipeSlice";
import {findAllKeywords} from "../recipe/model/Recipe";
import {selectUsers} from "../account/accountSlice";

export const FilteredRecipes = () => {
    const [keywordsFilter, setKeywordsFilter] = useState([]);
    const [authorFilter, setAuthorFilter] = useState(null);

    const recipes = useSelector(selectRecipes);
    const users = useSelector(selectUsers);

    const filteredRecipes = recipes.filter(rec => (keywordsFilter.length === 0 || rec.keywords.some(kw =>
        keywordsFilter.includes(kw))) &&
        (!authorFilter || rec.authorId === authorFilter))
        .sort((rec1, rec2) => moment(rec1.shareTime).diff(moment(rec2.shareTime), 'seconds') > 0);

    const allKeyWords = findAllKeywords(recipes);

    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <h1>Recipes</h1>
            <Segment>
                <Grid columns={2}>
                <GridColumn>
                <Dropdown
                    fluid
                    placeholder={"Select keywords"}
                    multiple
                    search
                    selection
                    clearable
                    options={allKeyWords.map(kw => ({
                        key: kw,
                        text: kw,
                        value: kw
                    }))}
                    value={keywordsFilter}
                    onChange={(e, {value}) => {
                        console.log("ADD_KW: ", value);
                        setKeywordsFilter(value);
                    }}
                /></GridColumn>
                <GridColumn>
                <Dropdown
                    fluid
                    text={authorFilter ? users.find(user => user.id === authorFilter).name : ""}
                    placeholder={"Select author"}
                    search
                    selection
                    clearable
                    value={authorFilter}
                    onChange={(e, {value}) => {
                        setAuthorFilter(value);
                    }}
                    options={users.map(user => ({
                        key: user.id,
                        text: `${user.name} (${user.username})`,
                        value: user.id
                    }))}
                /></GridColumn>
                </Grid>
            </Segment>
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
}