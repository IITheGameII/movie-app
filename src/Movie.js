import React, { useEffect, useState } from 'react';
import Searchfield from './Searchfield';

function Movie() {
    const [movies, setMovies] = useState([]);
    const [upcMovies, setUpcMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    /* fetch('https://api.themoviedb.org/3/discover/movie?api_key=e16d67854e21827198d7598e0fb0b0fd')
        .then(res => res.json())
        .then(json => setMovies(json.results)) */

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg'
        }
    };

    const getMovies = () => {
        Promise.all([
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1?api_key=e16d67854e21827198d7598e0fb0b0fd', options),
            fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options),
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        ])
            .then(([resMovies, resUpcMovies, resGenres]) =>
                Promise.all([resMovies.json(), resUpcMovies.json(), resGenres.json()])
            )
            .then(([dataMovie, dataUpcMovie, dataGenres]) => {
                setMovies(dataMovie.results);
                setUpcMovies(dataUpcMovie.results);
                setGenres(dataGenres.genres)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getMovies();
    }, [])

    /*  console.log(movies);
     console.log(upcMovies);
     console.log(genres); */

    const idToGenre = {};

    for (const genre of genres) {
        idToGenre[genre.id] = genre.name;
    }

    /*     console.log(idToGenre);
     */
    function getGenres(movies, idToGenre) {
        const genreNames = movies.genre_ids.map((genreId) => {
            const genreName = idToGenre[genreId];
            return genreName ? genreName : 'Unknown genre'
        })
        return genreNames.join(', ');
    }

    return (
        <div>
            <h1>Top Rated Movies</h1>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <img style={
                        {
                            width: 'auto',
                            height: '500px',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='movie poster'
                    />
                    <p>{movie.title}</p>
                    <p>{getGenres(movie, idToGenre)}</p>
                    <p>{movie.release_date}</p>
                    <p>Rating: {movie.vote_average}/10 </p>
                </div>
            ))
            }
            <h1>Upcoming Movies</h1>
            {upcMovies.map((upcMovie) => (
                <div key={upcMovie.id}>
                    <img style={
                        {
                            width: 'auto',
                            height: '500px',
                            marginLeft: '10px',
                            marginTop: '10px'
                        }}
                        src={`https://image.tmdb.org/t/p/w500/${upcMovie.poster_path}`} alt='movie poster'
                    />
                    <p>{upcMovie.title}</p>
                    <p>{getGenres(upcMovie, idToGenre)}</p>
                    <p>{upcMovie.release_date}</p>
                </div>
            ))}
        </div>
    )
}


export default Movie;