import React from "react";
import moment from "moment";
import {
    Card,
    Container,
    Divider,
    Grid,
    GridColumn,
    Image,
    Label,
    Table, TableCell,
    TableHeaderCell, TableRow
} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {selectUsers} from "../account/accountSlice";
import {selectRecipes} from "./recipeSlice";

export const RecipePreview = () => {

    const users = useSelector(selectUsers);
    const recipes = useSelector(selectRecipes);
    const {recipeId} = useParams();

    const recipe = recipes.find(recipe => recipe.id === recipeId);

    const author = users.find(user => user.id === recipe.authorId);


    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <Grid style={{
                margin: "0",
            }} columns={3}>
                <GridColumn textAlign={"center"}>
                    <Image centered height={300} src={recipe.photoPath} />
                    { author &&
                        <Card centered>
                            <Card.Content>
                                <Card.Header>Author: {author.username}</Card.Header>
                                <Card.Meta>
                                    {author.name}
                                </Card.Meta>
                                <Card.Description>
                                    {author.about.substr(0, 150) + "..."}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    }
                    { !author &&
                    <b>Unknown author</b>
                    }
                </GridColumn>
                <GridColumn>
                    <Container textAlign='center' as={"h2"}>{recipe.name}</Container>
                    <Container>
                        <Label horizontal>
                            {`First publication: ${moment(recipe.shareTime).format("YYYY-MM-DD HH:mm")}`}</Label>
                        <Label horizontal>
                            {`Last modification: ${moment(recipe.modificationTime).format("YYYY-MM-DD HH:mm")}`}</Label>
                    </Container>
                    <Container textAlign='left' as={"h4"}>{recipe.shortDescription}</Container>
                    <Divider />
                    <Container textAlign='justified'>
                        {recipe.detailedDescription}
                    </Container>
                </GridColumn>
                <GridColumn>
                    <h3>{recipe.title}</h3>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <TableHeaderCell/>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <TableRow><TableCell>Cooking time</TableCell><TableCell>{recipe.cookingTime} mins</TableCell></TableRow>
                            { recipe.products.map((item, idx) =>
                                <Table.Row key={idx}>
                                    <Table.Cell>{`Product#${idx + 1}`}</Table.Cell>
                                    <Table.Cell>{item}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </GridColumn>
                <Container textAlign={"center"}>
                    { recipe.keywords.map(kw =>
                        <Label as='a' tag>
                            {kw}
                        </Label>
                    )}
                </Container>
            </Grid>
        </div>
    );
}

RecipePreview.defaultProps = {

}
