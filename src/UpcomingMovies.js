/* import React, { useEffect, useState } from 'react';

function Upcoming() {
    const [upcMovies, setUpcMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg'
        }
    };
    const upcomingMovies = () => {
        Promise.all([
            fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options),
            fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        ])
            .then(([resUpcMovies, resGenres]) =>
                Promise.all([resUpcMovies.json(), resGenres.json()])
            )
            .then(([dataUpcMovie, dataGenres]) => {
                setUpcMovies(dataUpcMovie.results);
                setGenres(dataGenres.genres)
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        upcomingMovies();
    })

    console.log(upcMovies)

    return (
        <div>
            <h1>Upcoming Movies</h1>
            {upcMovies.map((movie) => (
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
                    <p>{movie.original_title}</p>
                    <p>{getGenres(movie, idToGenre)}</p>
                    <p>{movie.release_date}</p>
                </div>
            ))
            }
        </div>
    )
}
export default Upcoming; */