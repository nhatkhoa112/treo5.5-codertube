import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;




const MovieDetailPage = () => {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState({ genres: [], production_companies: [] })
    const fetchMovieData = async () => {
        const url =`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY  }`;
        const res = await fetch(url);
        const json = await res.json();
        console.log(json)

        setMovieDetail(json);
    }

    useEffect(() => {
        fetchMovieData()
    },[id])


    return (
        <div>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center">
                <div className="container  card-movie">
                    <img className="img-content" src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} alt={movieDetail.title} />
                    <div className="text-content">
                        <h1 className="text-center m-5">{movieDetail.title}</h1>
                        <div className="genders">
                            <strong>Genres:</strong>  {movieDetail.genres.map(g => <button key={g.id} className="genre-btn">{g.name}</button>)}
                        </div>
                        <div className="overview">
                            <strong>Overview:</strong>  {movieDetail.overview}
                        </div>
                        <div className="vote ">
                            <div>
                                <strong>Vote average:</strong> {movieDetail.vote_average}
                            </div>
                            <div>
                                <strong>Vote count:</strong> {movieDetail.vote_count}
                            </div>
                        </div>
                        <div className="budget">
                            <strong>Budget:</strong>    {movieDetail.budget}
                        </div>
                        <div className="popularity">
                            <strong>Popularity:</strong>{movieDetail.popularity}
                        </div>
                        <div className="production">
                            <strong>Production:</strong> {movieDetail.production_companies.map((p) => 
                                                                                                p.logo_path === null ? 
                                                                                                (
                                                                                                    <p>{p.name}</p>
                                                                                                ) : (
                                                                                                    <img src={`https://image.tmdb.org/t/p/w500/${p.logo_path}` } alt={p.name} />
                                                                                                )            )}
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default MovieDetailPage
