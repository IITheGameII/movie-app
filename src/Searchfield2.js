import React, { useState, useEffect } from 'react';

function Searchfield() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(null);
    const [page, setPage] = useState(1);

    const handleSearch = (e) => {
        e.preventDefault();
        setResults([]);
        setPage(1);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg', // Replace with your API key
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
            .then(resSearch => resSearch.json())
            .then(data => {
                setResults(data.results);
                setTotalResults(data.total_results);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const loadMoreResults = () => {
        if (results.length < totalResults) {
            const nextPage = page + 1;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg', // Replace with your API key
                }
            };
            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${nextPage}`, options)
                .then(res => res.json())
                .then(data => {
                    setResults([...results, ...data.results]);
                    setPage(nextPage);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    useEffect(() => {
        // Function to handle the scroll event and trigger lazy-loading
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop + windowHeight >= documentHeight - 100) {
                // Load more results when scrolling near the bottom (adjust 100 as needed)
                loadMoreResults();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, [results, totalResults, page]);

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
