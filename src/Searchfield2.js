import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Searchresult from './Searchresult';
/* import { useNavigate } from 'react-router-dom'; */

function Searchfield2() {
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(null);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    /* const navigate = useNavigate(); */

    const handleSearch = (e) => {
        e.preventDefault();
        setResults([]);
        setPage(1);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg',
            }
        };

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
            .then(res => { res.json() })
            .then(res => {
                setResults(res.results);
                setTotalResults(res.total_results);
                /* navigate(`/search/${query}`, { state: { results: res.results, totalResults: res.totalResults } }); */
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
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

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
                />
                <button type='submit'>Search</button>
            </form>


            <div>
                {totalResults !== null && <p>Total Results Found: {totalResults}</p>}
                {results && results.length > 0 ? (
                    results.map((movie) => (
                        <>
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <h2>{movie.title}</h2>
                            </Link>
                            <p>{movie.overview}</p>
                            <br />
                            <br />
                        </>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            {/* <Searchresult /> */}
        </div >
    );
}

export default Searchfield2;
