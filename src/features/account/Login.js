import {Field, Form, Formik, FormikProps} from "formik";
import {Button, Form as FormSemantic, Icon, Image, Message} from "semantic-ui-react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, selectLoginErrors} from "./accountSlice";
import {useHistory} from "react-router";


const MyUsernameInput = ({field, form, ...props}) => {
    console.log(field, form, props);
    return (
        <FormSemantic.Input
            fluid
            label='Username'
            placeholder={"Enter username"}
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
            placeholder={"Enter password"}
            error={form.errors.password ? {content: form.errors.password, pointing: "below"} : false}
            value={form.values.password}
            onChange={e => form.setFieldValue('password', e.target.value)}
        />
    )
};

export const Login = () => {
    const dispatch = useDispatch();

    const loginError = useSelector(selectLoginErrors);

    const history = useHistory();

    return (
        <div
            style={{
                margin: '0em 1em',
            }}
        >
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={(values, actions) => {
                    dispatch(login(values));
                }}
            >{(props: FormikProps<any>) => {
                console.log(props);
                return (
                    <Form style={{
                        width: '50%',
                        margin: 'auto',
                    }}>
                        { loginError &&
                        <Message attached='bottom' error>
                            {loginError}
                        </Message>
                        }
                        <FormSemantic>
                            <Field name={"username"} component={MyUsernameInput}/>
                            <Field name={"password"} component={MyPasswordInput}/>
                            <Button type={"submit"} color={"blue"}>Sing in</Button>
                        </FormSemantic>
                    </Form>
                )
            }}
            </Formik>
        </div>
    );
}