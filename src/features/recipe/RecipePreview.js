import React from "react";
import moment from "moment";
import {
    Button,
    Card,
    Container,
    Divider, Form as FormSemantic,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Image,
    Label,
    Table, TableCell,
    TableHeaderCell, TableRow
} from "semantic-ui-react";
import {User} from "../account/model/User";

export const RecipePreview = (props) => {

    const author = props.users.find(user => user.id === props.authorId);
    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            {/*<h1></h1>*/}
            <Grid style={{
                margin: "0",
            }} columns={3}>
                <GridColumn textAlign={"center"}>
                    <Image centered height={300} src={props.photoPath} />
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
                </GridColumn>
                <GridColumn>
                    <Container textAlign='center' as={"h2"}>{props.name}</Container>
                    <Container>
                        <Label horizontal>
                            {`First publication: ${moment(props.shareTime).format("YYYY-MM-DD HH:mm")}`}</Label>
                        <Label horizontal>
                            {`Last modification: ${moment(props.modificationTime).format("YYYY-MM-DD HH:mm")}`}</Label>
                    </Container>
                    <Container textAlign='left' as={"h4"}>{props.shortDescription}</Container>
                    <Divider />
                    <Container textAlign='justified'>
                        {props.detailedDescription}
                    </Container>
                </GridColumn>
                <GridColumn>
                    <h3>{props.title}</h3>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <TableHeaderCell/>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <TableRow><TableCell>Cooking time</TableCell><TableCell>{props.cookingTime} mins</TableCell></TableRow>
                            { props.products.map((item, idx) =>
                                <Table.Row key={idx}>
                                    <Table.Cell>{`#${idx + 1}`}</Table.Cell>
                                    <Table.Cell>{item}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </GridColumn>
                <Container textAlign={"center"}>
                    { props.keywords.map(kw =>
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
    // recipes: [{
    id: 'recipe_1',
    name: 'Recipe 1',
    authorId: "user_1",
    photoPath: "https://assets.epicurious.com/photos/5c191ba17daf685c6d771aad/master/pass/DECEMBER-SMALL-PLATES--Sausage-Sheet-Pan-Dinner-W-Potatoes-and-Hearty-Greens-13122018.jpg",
    shortDescription: "Recipe 1 detailed description with a long text in it for now to test it.",
    detailedDescription: "Recipe 1 detailed description with a long text in it for now to test it.Recipe 1 detailed description with a long text in it for now to test it.Recipe 1 detailed description with a long text in it for now to test it.Recipe 1 detailed description with a long text in it for now to test it.",
    shareTime: moment().subtract(2, 'hours'),
    modificationTime: moment().subtract(1, 'hours'),
    keywords: ["salad", "vegan"],
    products: ["onion", "tomato"],
    cookingTime: 80,
    users: [new User({
        id: 'user_0',
        name: "Test User0",
        username: "user0",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(0, 'days'),
        about: 'My name is User 0 and my username is user0.',

    }), new User({
        id: 'user_1',
        name: "Test User1",
        username: "user1",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(1, 'days'),
        about: 'My name is User 1 and my username is user1.',

    }), new User({
        id: 'user_2',
        name: "Test User2",
        username: "user2",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(2, 'days'),
        about: 'My name is User 2 and my username is user2.',

    }), new User({
        id: 'user_3',
        name: "Test User3",
        username: "user3",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(3, 'days'),
        about: 'My name is User 3 and my username is user3.',

    }), new User({
        id: 'user_4',
        name: "Test User4",
        username: "user4",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(4, 'days'),
        about: 'My name is User 4 and my username is user4.',

    }), new User({
        id: 'user_5',
        name: "Test User5",
        username: "user5",
        avatarPath: "https://i1.sndcdn.com/avatars-000463850295-w83a1g-t500x500.jpg",
        registrationDate: moment().subtract(5, 'days'),
        about: 'My name is User 5 and my username is user5.',

    })],
    // }, {
    //     id: 'recipe_2',
    //     name: 'Recipe 2',
    //     authorId: "user_3",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: ["meat", "meal"],
    // }, {
    //     id: 'recipe_3',
    //     name: 'Recipe 3',
    //     authorId: "user_1",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: ["meat", "meal"],
    // }, {
    //     id: 'recipe_4',
    //     name: 'Recipe 4',
    //     authorId: "user_3",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: ["meat", "meal"],
    // }, {
    //     id: 'recipe_5',
    //     name: 'Recipe 5',
    //     authorId: "user_2",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: ["meat", "meal"],
    // }, {
    //     id: 'recipe_6',
    //     name: 'Recipe 6',
    //     authorId: "user_1",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: ["meat", "meal"],
    // }, {
    //     id: 'recipe_7',
    //     name: 'Recipe 7',
    //     authorId: "user_2",
    //     photoPath: "https://assets.bonappetit.com/photos/5e7a6c79edf206000862e452/3:2/w_2280,h_1520,c_limit/Cooking-Home-Collection.jpg",
    //     detailedDescription: "Recipe 2 detailed description with a long text in it for now to test it.",
    //     shareTime: moment(),
    //     keywords: [],
    // }],
}