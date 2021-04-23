import React, { useState,useEffect} from 'react';
import { Container, Row, Col, Card , Button, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/movie'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [query,setQuery] = useState("");

    
    const fetchMovies = async () => {
        let res;
        if(query !== ''){
            res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        } else {
            res = await fetch(`${url}/upcoming?api_key=${API_KEY}`);
        }
        const json = await res.json();
        setMovies(json.results);

    }
    useEffect(() => {
        fetchMovies()
    },[movies])

    return (
        <div>
        <NavigationBar quey={query} setQuery={setQuery} />
        <Container>
            <h1 className="text-center mt-51">  Movies</h1>
            <Row>
                <Col className="col-card"> 
                    {movies.map((m) =>{
                        return <Card key={m.id} style={{ width: '18rem' , margin: "20px", height: "400px"}}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`} />
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text style={{height: "100px", overflow: "hidden", overflowY: "auto" }}>
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
        </Container>
        </div>
    )
}

export default HomePage
