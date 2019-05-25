import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Header from './Components/headerComponent/header';
import Homepage from './Components/pages/homePage';
import Product from './Components/pages/product';

class App extends Component {
  render() {
    return (
    	<Router>
	      <div className="App">
	        <Header />
	        	<Route exact path='/' component={Homepage} />
	        	<Route exact path='/product/:productid' component={Product} />
	      </div>
      </Router>
    );
  }
}

export default App;