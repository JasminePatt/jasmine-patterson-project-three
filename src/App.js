import firebase from './firebase.js';
import { useState } from 'react';
import './App.css';

function App() {
  const [feelings, setBooks] = useState([]);

  return (
    <div>
      <ul>
        {books.map((book) => {
          return (
            <li>
              <p>{book}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default App;
