import React from "react";
import moment from "moment";
import {Button, Card, Grid, GridColumn, Image} from "semantic-ui-react";
import {User} from "./model/User";

export const AccountsPreview = (props) => {
    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <h1>Users</h1>
            <Grid columns={5}>
                { props.accounts.map(acc =>
                    <GridColumn key={`account_${acc.id}`}>
                        <Card centered>
                            <Image src={acc.avatarPath} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{acc.username}</Card.Header>
                                <Card.Meta>
                                    {acc.name}<br/>
                                    <span className='date'>{`registered on ${moment(acc.registrationDate).format("YYYY-MM-DD")}`}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {acc.about.substr(0, 150) + "..."}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button primary>View</Button>
                                <Button color={"red"}>Delete</Button>
                                <Button color={"green"}>Edit</Button>
                            </Card.Content>
                        </Card>
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
}

AccountsPreview.defaultProps = {
    accounts: [new User({
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
}