import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import './App.css';
import Home from './Home.js';
import Book from './Book.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {amber100 as primary1Color, orange100 as primary2Color, brown200 as primary3Color} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: primary1Color,
		primary2Color: primary2Color,
		primary3Color: primary3Color
	}
});

class App extends Component {
  render() {
    return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router history={browserHistory}>
					<Route
						path="/"
						component={Home}
					/>
					<Route
						path="/book/:id"
						component={Book}
					/>
				</Router>
			</MuiThemeProvider>
    );
  }
}

export default App;
