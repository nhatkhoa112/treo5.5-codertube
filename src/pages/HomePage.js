import React, { useState,useEffect} from 'react';
import { Container, Row, Col, Card , Button, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/movie'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [query,setQuery] = useState("");
    const [genres, setGenres] = useState([]);


    console.log(genres)
    const fetchMovies = async () => {
        let res;
        if(query !== ''){
            res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        } else {
            res = await fetch(`${url}/upcoming?api_key=${API_KEY}`);
        }
        const json = await res.json();
        setMovies(json.results);
        console.log(json);

    }

    const fetchGenresMovie = async () => {
        let url = `https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setGenres(data);
    }


    useEffect(() => {
        fetchMovies();
        fetchGenresMovie();
    },[])

    return (
        <div>
        <NavigationBar quey={query} setQuery={setQuery} />
        <div className="main-content">
            
            <div className="sidebar">

            </div>
            <div className="movies-content">
                <h1 className="text-center mt-51">Movies</h1>
                <Row>
                    <Col className="col-card"> 
                        {movies.map((m) =>{
                            return <Card  key={m.id} style={{ width: '20rem' , margin: "20px", height: "860px"}}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`} style={{height: "200px"}} />
                                <Card.Body>
                                    <Card.Title style={{height: "100px", fontSize: "26px", paddingTop: "10px"}}>{m.title}</Card.Title>
                                    <div className="genres">
                                        {genres.genres.filter(g => m.genre_ids.includes(g.id)).map( e  => <button className="genre-name-btn" key={e.id}>{e.name}</button> )}
                                    </div>
                                    <Card.Text style={{height: "200px", overflow: "hidden", overflowY: "auto" }}>
                                    <strong><u>Overview:</u></strong> {m.overview}
                                    </Card.Text>
                                    <Button variant="primary">
                                        <Nav.Link as={Link} to={"/movies/" + m.id}>
                                            More Details
                                        </Nav.Link>
                                    </Button>
                                </Card.Body>
                            </Card>   
                        })}                   
                    </Col>
                </Row>
            </div>
           
        </div>
        </div>
    )
}

export default HomePage
