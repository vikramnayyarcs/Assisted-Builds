import React, {useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import logo from './New Logo.jpg';

function App() {
  const [todos, setTodos] = useState([]); //Sets up short term memory for the app, as an array.
  const [input, setInput] = useState(''); //Empty because initially, nothing is typed in the box.

  //useEffect - Called and runs once, when the app loads. userEffect,function,dependancies.
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc =>({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    //Called when the button is pressed.
    //console.log('Test'); TEST that the input goes the the console when the button is pressed.
    //ES6 makes this function easier.
    event.preventDefault(); //Stops the refresh of the page.
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    //setTodos([...todos, input]) //Uses a spread (adding the input to the end of what previously existed).
    setInput(''); //Resets the input field after it has been added to the array!
  }

  return (
    <div className="App">
        <img src={logo} alt="Logo" width="250" height="200"/>
      <form>
        <a href="https://linktr.ee/compandcode">Links to Follow CompAndCode</a>
        <br></br>
        <p>Shoutout Clever Programmer, Qazi and Sonny for putting on so many great live builds using
          React and Python, I'll leave a link to their YouTube below:
        </p>
        <br></br>
        <a href="https://www.youtube.com/c/CleverProgrammer/featured">Clever Programmer's Channel</a>
        <br></br>
        <FormControl>
          <InputLabel>Write a ToDo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
      <br></br>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      <ul>
        { //map is an ES6 function to loop through the array and the next line adds it to the database.
        todos.map(todo => (
          <Todo todo={todo}></Todo> //Now an object rather than a string.
        ))} 
      </ul>
    </div>
  );
}

export default App;
/*
  Notes:
  JSX - Allows JS to be ran by adding{} (Dynamic JavaScript).
  Component Based Design.
  State - Gets cleared when the page refreshes. Short term memory, component specific (e.g. for the App component).
  Prop - .
  React Hooks - .
  Button gets disabled if there's no input (Validation!!).

  ToDo Prop shown above. Line 36.

  Functional vs Class Based Components:
  Hooks - Belong to functional components.


  */