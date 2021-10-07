// PSEUDOCODE
// 1. Connect to firebase, by creating database
// 2. Reference databse from firebase utility and display input from db in console(then page)
// 3. Push data from userInput onto a new array(for the database)
// 4. Push new content onto list item
// 5. Create button that removes submitted notes

import realtimeData from './utilities/firebase';
import { useState, useEffect } from 'react';
import {ref, onValue, push, remove} from 'firebase/database';
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
    const myData = snapshot.val();

  // Empty array for the notes object
  const newArray = [];
  // 'For in' loop to gain access to all objects in the array

  for (let propName in myData) {
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

// Remove userInput from db
const deleteNote = (noteKeyDelete) => {
  const thisNote = ref(realtimeData, noteKeyDelete);
  remove(thisNote);
}

// DOM STUFF
  return (
    <div className="App">
      <header>
      <h1>Planted <br/> Ideas</h1>
      </header>
      <main>

      {/* Form container */}
      <form onSubmit={ handleSubmit } className="newNote">
        <fieldset>
          <label htmlFor="userNotepad">What's growing in your mind?</label>
          <textarea
          name="message" 
          rows="10" 
          cols="30"
          id="userNotepad"
          onChange={ handleChange }
          value={ userInput }
          placeholder="My mind is like a garden..."
          />
          <button className="submitBtn"><i aria-hidden="true" className="fas fa-plus" title="Submit your note"></i></button>
        </fieldset>
      </form>

      {/* Container for userInput(notes) */}
      <ul> {
        notes.map( (eachNote) => {
          return (
            <li key={eachNote.key}>
                <p>{eachNote.note}</p>
                <button onClick={ () => deleteNote(eachNote.key) }className="deleteBtn"><i aria-hidden="true" className="fas fa-trash" title="Delete your note"></i></button>
            </li>
          )
        })
        }
      </ul>
      </main>
      <footer>
        <p>Copyright Jasmine Patterson</p>
        <p>Created at <a href="https://junocollege.com/">Juno College 2021</a></p>
      </footer>
    </div>
  )
}
export default App;