import realtimeData from './firebase';
import { useState, useEffect } from 'react';
import {ref, onValue} from 'firebase/database';
import './App.css';

function App() {

// Stateful value and function, 'notes' as the local variable and 'setNotes' as the function to update the state
const [notes, setNotes] = useState([]);

// useEffect to run when the component first mounts
useEffect( () => {
// Creating database referennce
  const dbRef = ref(realtimeData);

  onValue(dbRef, (snapshot) => {
    console.log(snapshot.val())
    const myData = snapshot.val();
  });
  
}, []);



  return (
    <div>
      <h1>Planted Ideas</h1>
    </div>
  )
}
export default App;
