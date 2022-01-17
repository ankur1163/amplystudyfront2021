import React, {Fragment,useEffect,useState,useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { authContext } from '../../auth/AuthContext';

import ImageIcon from '@material-ui/icons/Image';
import {
    Box,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    TextField,
    Button
} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CommentSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme)=> ({

}))

export default function  ShowQuestions({userId,lectureId}) {
    const classes = useStyles();
    const { userProfile } = useContext(authContext);

    
    const firstLetterOfDisplayNameToUseInAvatar = userProfile.displayName.charAt(0).toUpperCase();
    console.log("dn",firstLetterOfDisplayNameToUseInAvatar);

    return(
        <Box my={2} mx={{ xs: 2, sm: 4, md: 5 }}>
            <Typography variant="h4"> Comments</Typography>
            <Box my={2} >
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    {firstLetterOfDisplayNameToUseInAvatar}
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="How do you change the text from bold to italic in visual studio?" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider/>
                    </Box>
                    <TextField rows={10} fullWidth={true}/>
                    <Button color="secondary" variant="outlined">Cancel</Button>
                    <Button color="primary" variant="contained">Save</Button>

            

        </Box>
    )
}