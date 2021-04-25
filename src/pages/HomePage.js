import React, { useState,useEffect} from 'react';
import {  Row, Col, Card , Button, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/movie'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [query,setQuery] = useState("");
    const [genres, setGenres] = useState({genres: []});
    const [gen_ids, setGen_ids] = useState([]);
    const [moviesDefault, setMoviesDefault] = useState([]);

    
    const fetchMovies = async () => {
        let newUrl = `${url}/upcoming?api_key=${API_KEY}`;
        if(query !== ''){
            newUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
        } 
        const res = await fetch(newUrl);
        const json = await res.json();
        setMovies(json.results);
        setMoviesDefault(json.results);
        
    }



    const getCategory = (newG) => {
        let g = moviesDefault.map(m => m.genre_ids);
        let gdx = g.join().split(",").map(m => parseInt(m));
        let p = splitNumber(gdx) ;
        let results = [] ;
        for(let i = 0; i< p[0].length; i++ ){
            let h = {};
            h.id = p[0][i];
            h.count = p[1][i];
            results.push(h);
        }
        for(let i of results){
            for(let j of newG.genres){
                if(i.id === j.id){
                    i['name'] = j.name;
                }
            }
        }

        setGen_ids(results);



    }


function splitNumber(arr) {
    var a = [],
    b = [],
    prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
        } else {
        b[b.length - 1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}



    
    const fetchGenresMovie = async () => {
        let url = `https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        setGenres(data);
    }


    useEffect(() => {
        fetchMovies();
        
    },[query])

    useEffect(() => {
        fetchGenresMovie();
    }, [movies])


    useEffect(() => {
        getCategory(genres);
    }, [genres])


    return (
        <div>
        <NavigationBar quey={query} setQuery={setQuery} />
        <div className="main-content">
            
            <div className="sidebar">
                <SideBar moviesDefault={moviesDefault} movies={movies} setMovies={setMovies} gen_ids={gen_ids}  />
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
                                    <div className="rating">
                                        <h4><strong>Rating: </strong></h4>
                                        <h4><strong>{m.vote_average}  </strong></h4> <h6>  from  </h6>  <h6>    {m.vote_count}   </h6> <h6>  votes  </h6>  
                                    </div>
                                    <div className="popularity">
                                        <h4><strong>Popularity: </strong></h4>
                                        <h6> {m.popularity} </h6> 
                                    </div>
                                    <div className="release-date">
                                        <h4><strong> Release Date: </strong></h4>
                                        <h6> {m.release_date} </h6> 
                                    </div>
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
