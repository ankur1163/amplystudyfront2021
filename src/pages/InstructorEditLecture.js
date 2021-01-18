import React,{useEffect,useState} from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Divider, Grid, Typography } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';


const getLectures = gql`

query MyQuery {
    lectures {
      title
      videoUrl
      description
      id
      paid
      snumber
      type
    }
  }
`





export default function InstructorEditLecture(props) {

    const [items, setItems] = useState([]);
    const { loading, error, data } = useQuery(getLectures);
  
    console.log("use effect",data)
    const SortableItem = SortableElement(({ value }) => <li >{value}</li>)

const SortableList = SortableContainer(({ items }) => {
    console.log("items in sortable container",items)
    return (
        <ul >
            {
                items.map((value, index) => (
                    <div  style={{  height: "60px" }}>
                        <SortableItem key={`item-${value.snumber}`} index={index} value={value.title} />
                        <Divider />

                    </div>

                ))
            }

        </ul>

    )
})
useEffect(() => {
    // check if data exists or data isn't empty
    if(data) {
        setItems(data.lectures);
    }

}, [data]);
    if (loading){
        console.log("loading")
        return 'Loading...';
    } 
    if (error) return `Error! ${error.message}`;
    
    const onSortEnd = ({ oldIndex, newIndex }) => {
        console.log("on sort end",oldIndex,newIndex)
         setItems(arrayMove(items, oldIndex, newIndex));
        
    };
   

    console.log("loading is",loading)
    console.log("error is",error)
    console.log("data is",data)
    console.log("items now",items)
   
        
    return (
        <>
         {loading && (<h1> loading...</h1>)}
         { data ? (<Grid style={{ marginTop: "80px" }} container direction="row">
            <Grid item sm={4}>
                <SortableList items={items } onSortEnd={onSortEnd} />

            </Grid>
            <Grid item>
                <h1>cool</h1>
                
                <Typography variant="h3"> this is great</Typography>
                <Typography variant="h3"> this is great</Typography>
            </Grid>
        </Grid>): null}
               


        </>
        




    )

    



}