import React,{useEffect} from 'react';
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

const SortableItem = SortableElement(({ value }) => <li>{value}</li>)

const SortableList = SortableContainer(({ items }) => {
    console.log("items are",items)
    return (
        <ul >
            {
                items.map((value, index) => (
                    <div style={{ color: "red", height: "30px", backgroundColor: "#f9f9f9" }}>
                        <SortableItem key={`item-${value.snumber}`} index={index} value={value.title} />
                        <Divider />

                    </div>

                ))
            }

        </ul>

    )
})

let items = [];

export default function InstructorEditLecture(props) {

    console.log("use effect")
    const { loading, error, data } = useQuery(getLectures);

    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const onSortEnd = ({ oldIndex, newIndex }) => {
        console.log("on sort end")
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    if(data){

    items = data?.lectures;
        
    return (
        <Grid style={{ marginTop: "80px" }} container direction="row">
            <Grid item sm={4}>
                <SortableList items={items} onSortEnd={onSortEnd} />

            </Grid>
            <Grid item>
                <h1>cool</h1>
                <Typography variant="h3"> {data?.lectures[0]?.title}</Typography>
                <Typography variant="h3"> this is great</Typography>
                <Typography variant="h3"> this is great</Typography>
            </Grid>
        </Grid>




    )

    }



}