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

        setMovieDetail(json);
    }

    useEffect(() => {
        fetchMovieData()
    },[id])


    return (
        <div>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center">
                <div className="container  card-movie" style={{height: "140vh"}}>
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
                        <div className="popuy">
                            <strong>Popularity:</strong>{movieDetail.popularity}
                        </div>
                        <strong>Production:</strong>
                        <div className="production">
                                {movieDetail.production_companies.map((p) => 
                                                p.logo_path === null ? 
                                                (
                                                    <p className="production-text">{p.name}</p>
                                                ) : (
                                                    <img src={`https://image.tmdb.org/t/p/w500/${p.logo_path}` } alt={p.name} />
                                                ))}
                        </div>
                        <div className="form-comments">
                            <div className="comment-list">
                                
                            </div>
                            <div className="input" >
                                <input type="text" placeholder="comment" />
                                <input type="submit" value="Enter" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default MovieDetailPage
