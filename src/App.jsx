import React, { useState } from 'react';
import './App.css';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    if (!movieTitle.trim()) {
      setError('Please enter a movie title');
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/recommend?title=${encodeURIComponent(movieTitle)}`);
      const data = await response.json();

      if (response.ok) {
        setRecommendations(data.recommendation);
      } else {
        setError(data.error || 'Something went wrong');
        setRecommendations([]);
      }
    } catch (err) {
      setError('Failed to connect to the backend');
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Movie Recommendation System</h1>
      <div className='input-group'>
        <input
        type="text"
        placeholder="Enter a movie title..."
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommended Movies:</h2>
          <ul>
            {recommendations.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
