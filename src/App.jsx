import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="App">
      <h1>Google Books Search</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a book title or author"
        />
        <button onClick={searchBooks}>Search</button>
      </div>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Cover'}
              alt={book.volumeInfo.title}
            />
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;