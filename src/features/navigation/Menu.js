import React, {useState} from 'react'
import {Image, Menu, Sticky} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectLogged} from "../account/accountSlice";
import {genders} from "../account/model/User";

export default function NavigationMenu () {
    const [activeItem, setActiveItem] = useState('home');

    const logged = useSelector(selectLogged);
    const dispatch = useDispatch();

    return (
        <Sticky onTop>
            <Menu size={"large"}>
                { logged &&
                <React.Fragment>
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                    ><NavLink style={{color: 'black'}} to={"/fullAccountsList"}>Users</NavLink></Menu.Item>
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                    ><NavLink style={{color: 'black'}} to={"/filteredRecipes"}>Browse recipes</NavLink></Menu.Item>
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
                    { !logged &&
                    <React.Fragment>
                        <Menu.Item
                            name='register'
                            active={activeItem === 'register'}><NavLink style={{color: 'black'}} to={"/register"}>Register</NavLink></Menu.Item>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}><NavLink style={{color: 'black'}} to={"/login"}>Login</NavLink></Menu.Item>
                    </React.Fragment>
                    }
                    { logged &&
                    <React.Fragment>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            onClick={() => dispatch(logout())}
                        >
                            <NavLink style={{color: 'black'}} to={"/login"}>Logout</NavLink>
                        </Menu.Item>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}>
                            <Image src={logged.avatarPath.length > 0 ? logged.avatarPath :
                                `${logged.gender === genders.MALE ? 'avatars/default-male.png' : 'avatars/default-female.png'}`}
                                   size={"mini"} circular />
                        </Menu.Item>
                    </React.Fragment>
                    }
                </Menu.Menu>
            </Menu>
        </Sticky>
    );
}

NavigationMenu.defaultProps = {
}