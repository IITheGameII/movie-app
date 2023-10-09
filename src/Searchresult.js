import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

function Searchresult() {
    const { query } = useParams();
    const location = useLocation();
    const { results, totalResults } = location.state || {};

    return (
        <div>
            {totalResults !== null && <p>Total Results Found: {totalResults}</p>}
            <h1>Search results for: {query}</h1>
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
    );
}

export default Searchresult;
