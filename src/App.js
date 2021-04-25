import React, {useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';



function App() {

  useEffect(() => {
    const appState = localStorage.getItem("imdbState");
    if(!appState){
      localStorage.setItem("imdbState", JSON.stringify({
        movies: [
          {id: "treo", comments: []}
        ]
      }))
    } else {
      console.log({appState : JSON.parse(appState)})
    }
  }, [])

  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:id" exact component={MovieDetailPage} />
        </Switch>
    </div>
  );
}

export default App;
