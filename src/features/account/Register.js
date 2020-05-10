import {Field, Form, Formik, FormikProps} from "formik";
import {Button, Form as FormSemantic, Image, TextArea} from 'semantic-ui-react';
import React from "react";
import {genders, roles, userConstraints} from "./model/User";
import 'semantic-ui-css/semantic.min.css';
import {useDispatch, useSelector} from "react-redux";
import {registerUser, selectUsers, userEdit} from "./accountSlice";
import { useParams } from "react-router";

function validateUsername(value) {
    let error;
    if (value.length > userConstraints.USERNAME_MAX_LENGTH) {
        error = `Username max length is: ${userConstraints.USERNAME_MAX_LENGTH}`;
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (value.length < userConstraints.PASSWORD_MIN_LENGTH) {
        error = `Password have to be at least ${userConstraints.PASSWORD_MIN_LENGTH} characters long`;
    } else if (!value.match(userConstraints.PASSWORD_PATTERN)) {
        error = `Password have to contain at least one digit and one special character[!,@,#,$,%,^,&,*]`;
    }
    return error;
}

const MyRoleInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Group inline>
            <label>Role</label>
            <FormSemantic.Radio
                onChange={e => form.setFieldValue('role', roles.ADMIN)}
                checked={field.value === roles.ADMIN} value={roles.ADMIN} label={"Admin"}/>
            <FormSemantic.Radio
                onChange={e => form.setFieldValue('role', roles.USER)}
                checked={field.value === roles.USER} value={roles.USER} label={"User"}/>
        </FormSemantic.Group>
    );
};
const MyGenderInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Group inline>
            <label>Gender</label>
            <FormSemantic.Radio
                onChange={e => form.setFieldValue('gender', genders.MALE)}
                checked={field.value === genders.MALE} value={genders.MALE} label={"Male"}/>
            <FormSemantic.Radio
                onChange={e => form.setFieldValue('gender', genders.FEMALE)}
                checked={field.value === genders.FEMALE} value={genders.FEMALE} label={"Female"}/>
        </FormSemantic.Group>
    );
};
const MyAvatarInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Group inline>
            <FormSemantic.Input type={"text"} label={"Avatar"} value={field.value} placeholder={"Input your avatar`s URL"}
                onChange={e => form.setFieldValue('avatarPath', e.target.value)} />
        </FormSemantic.Group>
    );
};
const MyDescriptionInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Field
            control={TextArea}
            label={"About"}
            placeholder={"Tell us about you..."}
            value={field.value}
            onChange={e => form.setFieldValue('about', e.target.value)}
        />
    );
};

const MyNameInput = ({field, form, ...props}) => {
    console.log(field, form, props);
    return (
        <FormSemantic.Input
            fluid
            label='Name'
            type={"text"}
            placeholder={"e.g: Dimitar Kolev"}
            error={form.errors.name ? {content: form.errors.name} : false}
            value={form.values.name}
            onChange={e => form.setFieldValue('name', e.target.value)}
        />
    )
};

const MyUsernameInput = ({field, form, ...props}) => {
    console.log(field, form, props);
    return (
        <FormSemantic.Input
            fluid
            label='Username'
            placeholder={"e.g: app_lover"}
            error={form.errors.username ? {content: form.errors.username, pointing: "below"} : false}
            value={form.values.username}
            onChange={e => form.setFieldValue('username', e.target.value)}
        />
    )
};


const MyPasswordInput = ({field, form, ...props}) => {
    console.log(field, form.errors, props);
    return (
        <FormSemantic.Input
            fluid
            label='Password'
            type={"password"}
            placeholder={"e.g: admin123$"}
            error={form.errors.password ? {content: form.errors.password, pointing: "below"} : false}
            value={form.values.password}
            onChange={e => form.setFieldValue('password', e.target.value)}
        />
    )
};

export function Register () {

    let {userId} = useParams();
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    if (userId) {
        const user = users.find(user => user.id === userId);
        return (
            <div
                style={{
                    margin: '0em 1em',
                }}
            >
                <h1>Edit user</h1>
                <Formik
                    initialValues={user}
                    onSubmit={(values, actions) => {
                        dispatch(userEdit(values));
                    }}
                >{(props: FormikProps<any>) => {
                    console.log(props);
                    return (
                        <Form style={{
                            width: '50%',
                            margin: 'auto',
                        }}>
                            <FormSemantic>
                                <FormSemantic.Group grouped>
                                    {props.values.avatarPath.length > 0 &&
                                    <Image height={180} src={props.values.avatarPath} />
                                    }
                                    {(props.values.avatarPath.length === 0 && props.values.gender === genders.MALE) &&
                                    <Image height={180} src={"/avatars/default-male.png"} />
                                    }
                                    {(props.values.avatarPath.length === 0 && props.values.gender === genders.FEMALE) &&
                                    <Image height={180} src={"/avatars/default-female.png"} />
                                    }
                                    <Field name={"avatarPath"} component={MyAvatarInput} />
                                </FormSemantic.Group>
                                <Field name={"name"} component={MyNameInput}/>
                                <Field name={"username"} component={MyUsernameInput} validate={validateUsername}/>
                                <Field name={"password"} component={MyPasswordInput} validate={validatePassword}/>
                                <Field name={"role"} component={MyRoleInput} />
                                <Field name={"gender"} component={MyGenderInput} />
                                <Field name={"about"} component={MyDescriptionInput} />
                                <Button type={"submit"} color={"blue"}>Save</Button>
                            </FormSemantic>
                        </Form>
                    )
                }}
                </Formik>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    margin: '0em 1em',
                }}
            >
                <h1>Register</h1>
                <Formik
                    initialValues={{
                        id: null,
                        name: "",
                        role: roles.USER,
                        gender: genders.MALE,
                        avatarPath: "",
                        username: "",
                        password: "",
                        about: "",
                    }}
                    onSubmit={(values, actions) => {
                        dispatch(registerUser(values));
                    }}
                >{(props: FormikProps<any>) => {
                    console.log(props);
                    return (
                        <Form style={{
                            width: '50%',
                            margin: 'auto',
                        }}>
                            <FormSemantic>
                                <FormSemantic.Group grouped>
                                    {props.values.avatarPath.length > 0 &&
                                    <Image height={180} src={props.values.avatarPath} />
                                    }
                                    {(props.values.avatarPath.length === 0 && props.values.gender === genders.MALE) &&
                                    <Image height={180} src={"avatars/default-male.png"} />
                                    }
                                    {(props.values.avatarPath.length === 0 && props.values.gender === genders.FEMALE) &&
                                    <Image height={180} src={"avatars/default-female.png"} />
                                    }
                                    <Field name={"avatarPath"} component={MyAvatarInput} />
                                </FormSemantic.Group>
                                <Field name={"name"} component={MyNameInput}/>
                                <Field name={"username"} component={MyUsernameInput} validate={validateUsername}/>
                                <Field name={"password"} component={MyPasswordInput} validate={validatePassword}/>
                                <Field name={"role"} component={MyRoleInput} />
                                <Field name={"gender"} component={MyGenderInput} />
                                <Field name={"about"} component={MyDescriptionInput} />
                                <Button type={"submit"} color={"blue"}>Register</Button>
                            </FormSemantic>
                        </Form>
                    )
                }}
                </Formik>
            </div>
        );
    }
}