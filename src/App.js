import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';



function App() {

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
