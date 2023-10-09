import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
    const [movie, setMovie] = useState({});
    const [videos, setVideos] = useState([]);
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTZkNjc4NTRlMjE4MjcxOThkNzU5OGUwZmIwYjBmZCIsInN1YiI6IjY1MTZhZmJmYTE5OWE2MDEzOGI4MWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JcDppgMNSax-FO2JJLKXhXghF3eSv4E0ulOCtWDdhhg',
            },
        };

        // Make a GET request to fetch movie details using the fetch API
        fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            });

        // Make a GET request to fetch movie videos
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
            .then((response) => response.json())
            .then((data) => {
                setVideos(data.results);
                /* console.log(data); */
            })
            .catch((error) => {
                console.error('Error fetching movie videos:', error);
            });
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
            .then((response) => response.json())
            .then((data) => {
                setCredits(data.cast);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movie credits:', error);
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(movie);
    console.log(movie.genres);

    const firstVideo = videos.length > 0 ? videos[0] : null;

    for (let i in movie.genres) {
        console.log(movie.genres[i].name)
    }

    return (
        <div className="movie-details-background">
            <Container className="movie-details-container">
                <Row>
                    <Col xs={12} md={4}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt="movie poster"
                            fluid
                            className="movie-poster"
                        />
                    </Col>
                    <Col xs={12} lg={4}>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <h3>Cast</h3>
                        {credits.map((actor, i) => (
                            // Display actors as long as there are less than 7 cast members
                            i < 6 && <div key={actor.id} className='movie-cast'>{actor.name}</div>
                        ))}
                        <span>Budget of the movie: ${movie.budget}</span><br />
                        <span>Movie revenue: ${movie.revenue}</span> <br />
                        <span>Runtime: {movie.runtime} minutes</span> <br />
                        <span>Release date: {movie.release_date}</span> <br />
                        <span>Genres: </span> <br />
                    </Col>
                    <Col xs={12} sm={8}>
                        <h3>Official Movie Trailer</h3>
                        {firstVideo && (
                            <div>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${firstVideo.key}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`Trailer for the movie ${movie.title}`}
                                ></iframe>
                            </div>
                        )}
                    </Col>
                </Row>
                <button onClick={() => navigate(-1)}>Back</button>
            </Container>
        </div>
    );

}

export default MovieDetails;
