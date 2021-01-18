import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Divider, Grid, Typography, Button,FormControlLabel,RadioGroup,Radio,FormControl,FormLabel } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import {Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "@material-ui/core";
import { useMutation } from '@apollo/client';
import { string } from 'yup/lib/locale';

const initialValues = {
    title:"",
    videoUrl:"",
    description:"",
    type:"lecture",
    paid:true,
    snumber:"",
}

const validationSchema = Yup.object().shape({
    title:Yup.string("please input title in string only").required("this field is required"),
    videoUrl:Yup.string("please input videoURL in string only"),
    description:Yup.string("please input description in string only").required("this field is required"),
    type:Yup.string("please input type").required("input is required"),
    paid:Yup.bool("only select true or false").required("paid field is required"),
    snumber:Yup.number("number is required").required("cant leave empty").positive("should be a positive number")

})




const ADD_LECTURE = gql`
mutation Addlecture($description: String!,$paid: Boolean!, $snumber:Int!,$title:String!,$type: String!,$videoUrl: String!) {
    insert_lectures(objects: {description: $description, paid: $paid, snumber: $snumber, title: $title, type: $type, videoUrl: $videoUrl}) {
      returning {
        description
        snumber
        title
        type
        videoUrl
      }
    }
  }




`;




export default function AddNewLectures(props) {
    const [addNewLecture, setaddNewLecture] = useState(true);
   const [addLecturegraphql, {loading}] = useMutation(ADD_LECTURE)
    
   const addlectureHandler=(values)=>{
    console.log("add lecture handler",values);
    const newValues = parseInt(values.snumber)
    values.snumber = newValues;
    addLecturegraphql({variables:values}).then(({errors,data})=> {
        return errors ? console.log("errors are ",errors) : console.log("data is ",data)
    })
    
}
   
   if (addNewLecture) {
      return (
        <div>
          <Button
            onClick={() => setaddNewLecture((prevstate) => !prevstate)}
            variant="contained"
            color="primary"
          >
            Add new lecture
          </Button>
        </div>
      );
    }
  
    return (
      <div>
        
            <Typography variant="h6">
                Add new lecture
            </Typography>
            <Formik initialValues={initialValues} onSubmit={addlectureHandler} validationSchema={validationSchema}>
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
                      <Grid  container >
                          <Grid item>
                          <TextField
                        label="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                        error={!!(errors && errors.title && touched.title)}
                        helperText={
                            errors && errors.title && touched.title
                        }
                        margin="normal"

                        />
                          </Grid>
                      

                    

                      <Grid item>
                      <TextField
                        label="videourl"
                        name="videoUrl"
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
                        <TextField
                        label="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                       
                        error={!!(errors && errors.description && touched.description)}
                        helperText={
                            errors && errors.description && touched.description
                        }
                        margin="normal"

                        />
                        </Grid>
                        <Grid item>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="type" name="type" value={values.type} onChange={handleChange}>
                            <FormControlLabel value="lecture" control={<Radio />} label="lecture" />
                            <FormControlLabel value="assignment" control={<Radio />} label="assignment" />
                            
                        </RadioGroup>
                        </FormControl>
                        <div>Picked: {values.picked}</div>
                        </Grid>
                        <Grid item>
                            paid
                        </Grid>
                        <Grid item>
                        <TextField
                        label="snumber"
                        name="snumber"
                        value={values.snumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                       
                        error={!!(errors && errors.snumber && touched.snumber)}
                        helperText={
                            errors && errors.snumber && touched.snumber
                        }
                        margin="normal"

                        />
                        </Grid>
                          
                          <Grid item >
                          <Button
                            
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disabled={!isValid || !!isInitialValid}>
                                Cancel
                            </Button>
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            
                            disabled={!isValid || !!isInitialValid}>
                                save
                            </Button>

                          </Grid>
                          <Grid item>
                          

                          </Grid>
                         
                       </Grid> 
                    </form>
                )

                }
            </Formik>
      
       
      </div>
    );
  }