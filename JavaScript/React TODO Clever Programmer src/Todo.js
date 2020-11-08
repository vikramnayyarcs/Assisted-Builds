//ES7 Snippet allows for shortcuts (rfce - enter).
//React Functional Component with an Export.
import React, {useState} from 'react';
import './Todo.css';
import db from './firebase'; //Local Firebase js file, not the database
import {List, ListItem, ListItemText, Button, Modal, makeStyles} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}));

function Todo(props) {
    //States:
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    }; 

    const updateToDo = () => {
        //Update ToDO with the new input text.
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>This is a Modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateToDo}>Update ToDO</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="Deadline"/>
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit ToDO</Button>
            <DeleteForeverIcon onClick = {event => db.collection('todos').doc(props.todo.id).delete() }/>
        </List>
        </>
    )
}

export default Todo
//Line 10:Text part and to do object.
/*
Notes:
Components: Reusable code e.g. each ToDo element.
Props: Properties. Differentiates between components.
    E.g. the ToDO 'title' differentiates.

Component has been moved to keep code clean.
All components start with a CAPITAL letter.    

<> </> is a react fragment which wraps the code.
*/