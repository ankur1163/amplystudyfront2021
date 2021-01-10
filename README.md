
import React, {createContext,useState,useContext} from "react";
import {useHistory,Route,Redirect} from 'react-router-dom';


export const authContext = createContext(null);

export function AuthProvider({children}){
    const [isUserSignedIn,setIsUserSignedIn] = useState(!!localStorage.getItem("user token"))
    const history = useHistory();
    const signout = ()=>{
        localStorage.removeItem("user_token");
        setIsUserSignedIn(false);
        history.push("/signin")
    }
    return <authContext.Provider value= {{
        isUserSignedIn,
        setIsUserSignedIn,
        signout,
    }}>
        {children}
    </authContext.Provider>
}

export function ProtectedRoute({children, props}){
    const context = useContext(authContext);
    return <Route {...props}>
        {context?.isUserSignedIn ?children :<Redirect to="/signin"></Redirect>}
    </Route>
}

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { Button } from '@material-ui/core';
import React,{useContext} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {Typography} from "@material-ui/core";
import {TextField} from "@material-ui/core";

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { authContext } from '../auth/AuthContext';

const initialValues = {
    email:"",
    password:"",
}

const SIGNIN_MUTATION = gql`
mutation Signin($email: String!,$password: String!) {
    login(credentials: {email: $email, password: $password}) {
        
      accessToken
      id
    }
  }
  

`;
const validationSchema = Yup.object().shape({
    email:Yup.string()
    .email("it should be an email")
    .required("this field is required"),
    password:Yup.string().required("this field is required"),
});

export const Signin = (props)=>{
    const context = useContext(authContext);
    const [signin,{loading}]= useMutation(SIGNIN_MUTATION);
    const history = useHistory();
    const afterLogin = (data)=>{
        console.log(data.login.accessToken); 
        localStorage.setItem("user_token",data.login.accessToken);
        context?.setIsUserSignedIn(true);
        history.push(`/profile${data.login.id}`)
    }
    const signinHandler = (values)=> {
        console.log("values for sign in",values)
        signin({variables:values}).then(({errors,data})=>{
            console.log("data is ", data)
            return errors ? console.log(errors) : afterLogin(data)
        })
    }
    return (
        <div>
            <Typography variant="h6">
                Sign in
            </Typography>
            <Formik initialValues={initialValues} onSubmit={signinHandler} validationSchema={validationSchema}>
                {({
                    values,
                    touched,
                    errors,
                    isValid,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isInitialValid,
                    submitCount,
                    isSubmitting
                })=>(
                    <form onSubmit={handleSubmit} >
                          <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={!!(errors && errors.email && touched.email)}
                        helperText={
                            errors && errors.email && touched.email
                        }
                        margin="normal"

                        />
                         <TextField
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={!!(errors && errors.password && touched.password)}
                        helperText={
                            errors && errors.password && touched.password
                        }
                        margin="normal"

                        />
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={!isValid || !!isInitialValid}>
                                Sign in 
                            </Button>
                    </form>
                )

                }
            </Formik>

        </div>
    )
}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import React from 'react';

import {Formik} from "formik";
import * as Yup from "yup";
import {Typography} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";

const initialValues = {
    displayName:"",
    email:"",
    password:""
}
const SIGN_UP_MUTATION = gql`
mutation Signup($email:String!,$password:String!,$displayName: String!) {
    create_user(credentials: {email: $email, password: $password, displayName: $displayName}) {
      displayName
      email
      id
    }
  }
  


`;

const validationSchema = Yup.object().shape({
    displayName: Yup.string().required("this field is required"),
    email:Yup.string().email("it should be an email").required("please fill email id"),
    password: Yup.string().required("this field is required"),
})
export const SignUp = (props)=>{
    const [signup, {loading}] = useMutation(SIGN_UP_MUTATION)
    let history = useHistory();
    const signupHandler = (values)=>{
        console.log("values from form",values)
        signup({
            variables:values
        }).then(({error})=>{
            if(error){
                console.log(error)
            }
            else {
                history.push("/signin")
            }
        }).catch(console.error)
    }
    return (
        <div>
            <Typography varaint="h6">Sign up</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={signupHandler}
                >
                {({
                     values,
                     touched,
                     errors,
                     isValid,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isInitialValid,

                }
                   
                )=><form onSubmit={(e)=> {e.preventDefault(); handleSubmit();signupHandler();}}>
                        <TextField
                        label="Display Name"
                        name="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={!!(errors && errors.displayName && touched.displayName)}
                        helperText={
                            errors && errors.displayName && touched.displayName
                        }
                        margin="normal"

                        />
                        <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={!!(errors && errors.email && touched.email)}
                        helperText={
                            errors && errors.email && touched.email
                        }
                        margin="normal"

                        />
                          <TextField
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={!!(errors && errors.password && touched.password)}
                        helperText={
                            errors && errors.password && touched.password
                        }
                        margin="normal"

                        />
                        <Button variant="contained"  fullWidth type="submit" disabled={!isValid || !!isInitialValid }>
                            Sign up
                        </Button>
                                            
                                           

                    </form>}
                </Formik>
        </div>
    )
}
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
