import React, { useState } from 'react';

function Searchfield() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg'
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
            .then(resSearch => resSearch.json())
            .then(data => {
                setResults(data.results);
                setTotalResults(data.total_results);
                setQuery('');
            })
            .catch(err => {
                console.error(err);
            });
    };

    console.log(results);

    return (
        <div>
            <h1>Movie Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <button type='submit'>Search</button>
            </form>
            <div>
                {totalResults !== null && <p>Total Results: {totalResults}</p>}
                {results && results.length > 0 ? (
                    results.map((movie) => (
                        <div key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <br />
                            <br />
                            <br />
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}

export default Searchfield;
