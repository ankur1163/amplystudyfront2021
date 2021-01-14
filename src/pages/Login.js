import { Button } from '@material-ui/core';
import React,{useContext} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {Typography,Grid} from "@material-ui/core";
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

function Login  (props){
    const context = useContext(authContext);
    const [signin,{loading}]= useMutation(SIGNIN_MUTATION);
    const history = useHistory();
    const afterLogin = (data)=>{
        console.log(data.login.accessToken); 
        localStorage.setItem("user_token",data.login.accessToken);
        context?.setIsUserSignedIn(true);
        history.push(`/studentdashboard${data.login.id}`)
    }
    const signinHandler = (values)=> {
        console.log("values for sign in",values)

        
            signin({variables:values}).then(({errors,data})=>{
                console.log("data is ", data)
                return errors ? console.log(errors) : afterLogin(data)
            })

        
       
    }
    return (
      <Grid container spacing={10} align="center" style={{marginTop:"80px"}} direction="column">
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
                      <grid item>
                      <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                        error={!!(errors && errors.email && touched.email)}
                        helperText={
                            errors && errors.email && touched.email
                        }
                        margin="normal"

                        />

                      </grid>

                      <Grid item>
                      <TextField
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                       
                        error={!!(errors && errors.password && touched.password)}
                        helperText={
                            errors && errors.password && touched.password
                        }
                        margin="normal"

                        />


                      </Grid>
                          
                          <Grid item>
                          <Button
                            variant="contained"
                            
                            type="submit"
                            disabled={!isValid || !!isInitialValid}>
                                Sign in 
                            </Button>

                          </Grid>
                         
                        
                    </form>
                )

                }
            </Formik>
      </Grid>
        
            

        
    )
}

export default Login;