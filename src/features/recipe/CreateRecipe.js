import {Field, Form, Formik, FormikProps} from "formik";
import {
    Button,
    Form as FormSemantic,
    Image,
    Table, TableHeaderCell,
    TextArea
} from 'semantic-ui-react';
import React, {useState} from "react";
import 'semantic-ui-css/semantic.min.css';
import {recipeConstraints} from "./model/Recipe";
import { useParams } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {recipeEdit, selectRecipes, shareRecipe} from "./recipeSlice";
import {selectLogged} from "../account/accountSlice";

function validateName(value) {
    let error;
    if (value.length > recipeConstraints.MAX_NAME_LENGTH) {
        error = `Can be up to ${recipeConstraints.MAX_NAME_LENGTH} symbols long.`;
    }
    return error;
}

function validateShortDescription(value) {
    let error;
    if (value.length > recipeConstraints.MAX_SHORT_DESCRIPTION_LENGTH) {
        error = `Can be up to ${recipeConstraints.MAX_SHORT_DESCRIPTION_LENGTH} symbols long.`;
    }
    return error;
}

function validateDetailedDescription(value) {
    let error;
    if (value.length > recipeConstraints.MAX_DETAILED_DESCRIPTION_LENGTH) {
        error = `Can be up to ${recipeConstraints.MAX_DETAILED_DESCRIPTION_LENGTH} symbols long.`;
    }
    return error;
}

const MyPhotoInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Group inline>
            <FormSemantic.Input type={"text"} label={"Photo"} value={field.value} required
                placeholder={"Input your avatar`s URL"}
                onChange={e => form.setFieldValue('photoPath', e.target.value)} />
        </FormSemantic.Group>
    );
};

const MyNameInput = ({field, form, ...props}) => {
    console.log(field, form, props);
    return (
        <FormSemantic.Input
            fluid
            label='Name'
            type={"text"}
            placeholder={"e.g: Lasagna"}
            error={form.errors.name ? {content: form.errors.name} : false}
            value={form.values.name}
            onChange={e => form.setFieldValue('name', e.target.value)}
        />
    )
};

const MyTimeInput = ({field, form, ...props}) => {
    console.log(field, form, props);
    return (
        <FormSemantic.Input
            fluid
            label='Cooking time'
            type={"number"}
            error={form.errors.cookingTime ? {content: form.errors.cookingTime} : false}
            value={form.values.cookingTime}
            onChange={e => form.setFieldValue('cookingTime', e.target.value)}
        />
    )
};

const MyShortDescriptionInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Field
            control={TextArea}
            label={`Short description [rem: ${recipeConstraints.MAX_SHORT_DESCRIPTION_LENGTH - field.value.length} chars.]`}
            placeholder={"Write down a short description"}
            value={field.value}
            onChange={e => {
                if (e.target.value.length <= recipeConstraints.MAX_SHORT_DESCRIPTION_LENGTH) {
                    form.setFieldValue('shortDescription', e.target.value)
                }
            }}
        />
    );
};

const MyDetailedDescriptionInput = ({field, form, ...props}) => {
    return (
        <FormSemantic.Field
            control={TextArea}
            label={`Detailed description [rem: ${recipeConstraints.MAX_DETAILED_DESCRIPTION_LENGTH - field.value.length} chars.]`}
            placeholder={"Write down more detailed description"}
            value={field.value}
            onChange={e => {
                if (e.target.value.length <= recipeConstraints.MAX_DETAILED_DESCRIPTION_LENGTH) {
                    form.setFieldValue('detailedDescription', e.target.value)
                }
            }}
        />
    );
};

const MyProductsInput = ({field, form, ...props}) => {
    return (
        <TableView title={"Products"} items={field.value} fieldName={"Product"} onSubmitClick={(value) => {
            form.setFieldValue("products", field.value.concat(value));
        }} onRemoveClick={(removeIdx) => {
            form.setFieldValue("products", field.value.filter((prod, idx) => idx !== removeIdx));
        }}/>
    );
}

function TableView (props) {
    const [input, setInput] = useState({
        shown: false,
        value: "",
    })
    return (
        <React.Fragment>
            <h3>{props.title}</h3>
            <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        <TableHeaderCell>Number</TableHeaderCell>
                        <Table.HeaderCell>{props.fieldName}</Table.HeaderCell>
                        <Table.HeaderCell>Option</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { props.items.map((item, idx) =>
                        <Table.Row key={idx}>
                            <Table.Cell>{`#${idx + 1}`}</Table.Cell>
                            <Table.Cell>{item}</Table.Cell>
                            <Table.Cell><Button color={"red"}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    props.onRemoveClick(idx);
                                }}>
                                Remove</Button></Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            { !input.shown &&
                                <Button
                                    floated='right'
                                    primary
                                    size='small'
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setInput({
                                            shown: true,
                                        });
                                    }}
                                >
                                    Add
                                </Button>
                            }
                            { input.shown &&
                            <React.Fragment>
                                <FormSemantic>
                                    <FormSemantic.Input
                                        value={input.value}
                                        placeholder={"Type a name"}
                                        onChange={(e, {value}) => {
                                            setInput({
                                                ...input,
                                                value: value,
                                            })
                                        }}
                                    />
                                    <Button
                                        floated='right'
                                        primary
                                        size='small'
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            setInput({
                                                shown: false,
                                                value: "",
                                            });
                                            props.onSubmitClick(input.value);
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </FormSemantic>
                            </React.Fragment>
                            }
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </React.Fragment>
    );
}

const MyKeywordsInput = ({field, form, ...props}) => {
    return (
        <TableView title={"Keywords"} items={field.value} fieldName={"Word"} onSubmitClick={(value) => {
            form.setFieldValue("keywords", field.value.concat(value));
        }} onRemoveClick={(removeIdx) => {
            form.setFieldValue("keywords", field.value.filter((prod, idx) => idx !== removeIdx));
        }}/>
    );
}

export const CreateRecipe = () => {
    const {recipeId} = useParams();
    const recipes = useSelector(selectRecipes);

    const dispatch = useDispatch();
    const logged = useSelector(selectLogged);

    if (recipeId) {
        const recipe = recipes.find(recipe => recipe.id === recipeId);

        return (
            <div
                style={{
                    margin: '0em 1em',
                }}
            >
                <h1>Edit recipe</h1>
                <Formik
                    initialValues={recipe}
                    onSubmit={(values, actions) => {
                        dispatch(recipeEdit(values));
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
                                    {props.values.photoPath.length > 0 &&
                                    <Image height={180} src={props.values.photoPath} />
                                    }
                                    {(props.values.photoPath.length === 0) &&
                                    <Image height={180} src={"https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6"} />
                                    }
                                    <Field name={"photoPath"} component={MyPhotoInput} />
                                </FormSemantic.Group>
                                <Field name={"name"} component={MyNameInput} validation={validateName}/>
                                <Field name={"cookingTime"} component={MyTimeInput} />
                                <Field name={"shortDescription"} component={MyShortDescriptionInput} validate={validateShortDescription}/>
                                <Field name={"detailedDescription"} component={MyDetailedDescriptionInput} validate={validateDetailedDescription}/>
                                <Field name={"products"} component={MyProductsInput} />
                                <Field name={"keywords"} component={MyKeywordsInput} />
                                <Button type={"submit"} color={"blue"}>Register</Button>
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
                <h1>Share recipe</h1>
                <Formik
                    initialValues={{
                        name: "",
                        shortDescription: "",
                        cookingTime: 0,
                        products: [],
                        photoPath: "",
                        detailedDescription: "",
                        keywords: [],
                        authorId: logged.id,
                    }}
                    onSubmit={(values, actions) => {
                        dispatch(shareRecipe(values));
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
                                    {props.values.photoPath.length > 0 &&
                                    <Image height={180} src={props.values.photoPath} />
                                    }
                                    {(props.values.photoPath.length === 0) &&
                                    <Image height={180} src={"https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6"} />
                                    }
                                    <Field name={"photoPath"} component={MyPhotoInput} />
                                </FormSemantic.Group>
                                <Field name={"name"} component={MyNameInput} validation={validateName}/>
                                <Field name={"cookingTime"} component={MyTimeInput} />
                                <Field name={"shortDescription"} component={MyShortDescriptionInput} validate={validateShortDescription}/>
                                <Field name={"detailedDescription"} component={MyDetailedDescriptionInput} validate={validateDetailedDescription}/>
                                <Field name={"products"} component={MyProductsInput} />
                                <Field name={"keywords"} component={MyKeywordsInput} />
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