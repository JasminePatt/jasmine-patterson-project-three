import realtimeData from './firebase';
import { useState, useEffect } from 'react';
import {ref, onValue} from 'firebase/database';
import './App.css';

function App() {


// USE STATE VARIABLES

// Stateful value and function, 'notes' as the local variable and 'setNotes' as the function to update the state
const [notes, setNotes] = useState([]);


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
    console.log(propName);

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





  return (
    <div>
      <h1>Planted Ideas</h1>

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
    </div>
  )
}
export default App;
