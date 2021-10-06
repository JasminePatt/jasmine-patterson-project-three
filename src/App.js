// PSEUDOCODE

// 1. Connect to firebase
// 2. Reference databse and display input on page
// 3. Make a container for the form
  // Consider putting the notes and the form in separate components from main App.js

import realtimeData from './utilities/firebase';
import { useState, useEffect } from 'react';
import {ref, onValue, push} from 'firebase/database';
import './styles/App.css';

function App() {


// USE STATE VARIABLES

// Stateful value and function, 'notes' as the local variable and 'setNotes' as the function to update the state
const [notes, setNotes] = useState([]);

// State for user input
const [userInput, setUserInput]  = useState("");

// USE EFFECT

// useEffect to run when the component first mounts
useEffect( () => {
  // Creating database referennce
  const dbRef = ref(realtimeData);

  onValue(dbRef, (snapshot) => {
    // console.log(snapshot.val())
    const myData = snapshot.val();

  // Empty array for the notes object
  const newArray = [];
  // 'For in' loop to gain access to all objects in the array

  for (let propName in myData) {
    // console.log(propName);

    // Save the loop in a new variable
    const notesObject = {
      key: propName,
      note: myData[propName]
    }

    // Push all new input on to the notesObject onto the Array
    newArray.push(notesObject)
  }
// Passing our state the array
  setNotes(newArray);
  });
  
}, []);

// EVENT HANDLERS

const handleChange = (event) => {
  // console.log("Hello?");
  // console.log(event.target.value);
  setUserInput(event.target.value);
}

// Prevent default behaviour of form
const handleSubmit = (event) => {
  event.preventDefault();
  // Push user input on to the array by referencing the database
  if (userInput) {
    const dbRef = ref(realtimeData);
    push(dbRef, userInput);
    setUserInput("");
  } else {
    alert("Still thinking?")
  }
}

// DOM STUFF
  return (
    <div>
      <header>
      <h1>Planted <br/> Ideas</h1>
      </header>
      <main>

      {/* Form container */}
      <form onSubmit={ handleSubmit } >
        <label htmlFor="userNotepad">What's growing in your mind?</label>
        <input
        type="text"
        id="userNotepad"
        onChange={ handleChange }
        value={ userInput }
        />
        <button>Plant it!<i className="fas fa-plus"></i></button>
      </form>

      {/* Container for page content(notes) */}
      <ul> {
        notes.map( (eachNote) => {
          return (
            <li key={eachNote.key}>
                <p>{eachNote.note}</p>
            </li>
          )
        })
        }
      </ul>
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College 2021</a></p>
      </footer>
    </div>
  )
}
export default App;
