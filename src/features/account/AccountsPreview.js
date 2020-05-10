import React from "react";
import moment from "moment";
import {Button, Card, Grid, GridColumn, Image} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLogged, selectUsers, userRemove} from "./accountSlice";
import {genders, roles} from "./model/User";

export const AccountsPreview = () => {

    const dispatch = useDispatch();
    const accounts = useSelector(selectUsers);
    const logged = useSelector(selectLogged);

    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <h1>Users</h1>
            <Grid columns={5}>
                { accounts.map(acc =>
                    <GridColumn key={`account_${acc.id}`}>
                        <Card centered>
                            <Image src={acc.avatarPath.length ? acc.avatarPath
                                : `avatars/${acc.gender === genders.MALE ? "default-male.png" : "default-female.png"}`} wrapped ui={false} />
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
                            { (logged && (logged.role === roles.ADMIN || logged.id === acc.id)) &&
                                <Card.Content extra>
                                    <Button color={"red"} onClick={() => dispatch(userRemove(acc.id))}>Delete</Button>
                                    <Button color={"green"}><NavLink style={{color: "white"}} to={`/userEdit/${acc.id}`}>Edit</NavLink></Button>
                                </Card.Content>
                            }
                        </Card>
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
}

AccountsPreview.defaultProps = {
    accounts: [],
}