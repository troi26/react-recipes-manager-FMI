import React, { Component } from 'react'
import {Image, Menu, Sticky} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

export default class NavigationMenu extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Sticky onTop>
                <Menu size={"large"} >

                    { this.props.logged &&
                    <React.Fragment>
                        <Menu.Item
                            name='messages'
                            active={activeItem === 'messages'}
                        ><NavLink style={{color: 'black'}} to={"/fullAccountsList"}>Users</NavLink></Menu.Item>
                        <Menu.Item
                            name='messages'
                            active={activeItem === 'messages'}
                        ><NavLink style={{color: 'black'}} to={"/filteredRecipes"}>Short recipes</NavLink></Menu.Item>
                        <Menu.Item
                            name='messages'
                            active={activeItem === 'messages'}
                        ><NavLink style={{color: 'black'}} to={"/fullRecipesList"}>All recipes</NavLink></Menu.Item>
                        <Menu.Item
                            name='messages'
                            active={activeItem === 'messages'}
                        ><NavLink style={{color: 'black'}} to={"/addRecipe"}>Add recipe</NavLink></Menu.Item>
                    </React.Fragment>
                    }

                    <Menu.Menu position='right'>
                        { !this.props.logged &&
                        <React.Fragment>
                            <Menu.Item
                                name='register'
                                active={activeItem === 'register'}><NavLink style={{color: 'black'}} to={"/register"}>Register</NavLink></Menu.Item>
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}><NavLink style={{color: 'black'}} to={"/login"}>Login</NavLink></Menu.Item>
                        </React.Fragment>
                        }
                        { this.props.logged &&
                        <React.Fragment>
                            <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}><NavLink style={{color: 'black'}} to={"/login"}>Logout</NavLink></Menu.Item>
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}>
                                <Image src='avatars/default-male.png' size={"mini"} circular />
                            </Menu.Item>
                        </React.Fragment>
                        }
                    </Menu.Menu>
                </Menu>
            </Sticky>
        )
    }
}

NavigationMenu.defaultProps = {
    logged: {},
}