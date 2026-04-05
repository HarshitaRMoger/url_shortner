import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    // URL validation
    if (!url.startsWith("http")) {
      alert("Enter a valid URL (must start with http/https)");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/shorten', {
        originalUrl: url
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>🔗 URL Shortener</h1>

        <input
          type="text"
          placeholder="Paste your long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Shorten
        </button>

        {shortUrl && (
          <div className="result">
            <p>Short URL:</p>

            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                alert("Copied to clipboard!");
              }}
            >
              Copy
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;