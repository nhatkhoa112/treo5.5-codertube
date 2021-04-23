import React, { useState,useEffect} from 'react';
import { Container, Row, Col, Card , Button} from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/movie'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [query,setQuery] = useState("");

    console.log(query);
    
    const fetchMovies = async () => {
        let res;
        if(query !== ''){
            res = await fetch(`${url}/q=${query}?api_key=${API_KEY}`)
        } else {
            res = await fetch(`${url}/upcoming?api_key=${API_KEY}`);
        }
        const json = await res.json();
        setMovies(json.results);

    }
    useEffect(() => {
        fetchMovies()
        console.log(movies)
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
                                <Button variant="primary">Go somewhere</Button>
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
