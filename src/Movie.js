import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Searchfield2 from './Searchfield2';
import './Movie.css';

function Movie() {
    const [movies, setMovies] = useState([]);
    const [upcMovies, setUpcMovies] = useState([]);
    const [genres, setGenres] = useState([]);

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

    /*   console.log(movies);
      console.log(upcMovies);
      console.log(genres);
   */
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
        <Container className='container'>
            <Searchfield2 />
            <h1>Top Rated Movies</h1>
            <Row>
                {movies.map((movie) => (
                    <Col key={movie.id} md={3} style={{ maxWidth: '25%' }}>
                        <div>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    style={{
                                        width: '100%', // Set to 100% to fit within the 25% width of the column
                                        height: 'auto',
                                        marginBottom: '10px',
                                    }}
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                    alt='movie poster'
                                />
                                <p className='mb-0 title'>{movie.title}</p>
                            </Link>
                            <div className='text'>
                                <p className='mb-0'>Genres: {getGenres(movie, idToGenre)}</p>
                                <p className='mb-0'>Date of release: {movie.release_date}</p>
                                <span>Rating: {movie.vote_average}/10 </span>
                                <Link to={`/movie/${movie.id}`}>
                                    <button className='more-details'>More details</button>
                                </Link>
                            </div>
                        </div>
                    </Col>

                ))}
            </Row>

            <h1>Upcoming Movies</h1>
            <Row>
                {upcMovies.map((upcMovie) => (
                    <Col key={upcMovie.id} md={3}>
                        <div>
                            <Link to={`/movie/${upcMovie.id}`}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '450px',
                                        marginBottom: '10px',
                                    }}
                                    src={`https://image.tmdb.org/t/p/w500/${upcMovie.poster_path}`}
                                    alt='movie poster'
                                />
                                <p className='mb-0 title'>{upcMovie.title}</p>
                            </Link>
                            <p className='mb-0'>Genre: {getGenres(upcMovie, idToGenre)}</p>
                            <span>Release date: {upcMovie.release_date}</span>
                            <Link to={`/movie/${upcMovie.id}`}>
                                <button className='more-details2'>More details</button>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Movie;