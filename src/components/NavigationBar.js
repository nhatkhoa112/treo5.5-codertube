import React from 'react';
import { Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap';



const NavigationBar = ({query, setQuery}) => {

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    return (
        <div>
            <div>
                <header>
                    <div className="container">
                        <div className="inner-content">
                            <div className="brand">
                                <img src="https://lwfiles.mycourse.app/coderschool-public/33fc8e54f6d5dad7d037060f88c62c18.png" alt="coderschool" width="200px"/>   
                            </div>
                            <ul className="nav-links">
                                <li>
                                    <Nav.Link as={Link} exact="true"  to="/">
                                        Home
                                    </Nav.Link>
                                    <form >
                                        <input type="text" 
                                                placeholder="Movie Name" 
                                                value={query}
                                                onChange={onChange}
                                                />                                        <input type="submit" 
                                                value="Search"
                                                />
                                    </form>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default NavigationBar
