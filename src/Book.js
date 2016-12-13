import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import './App.css';

class Book extends Component {
	constructor(){
		super();
		this.books = [];
	}
	componentDidMount() {
		fetch('/api/Books?filter={"include":["authors", "media"], "limit":20}')
		.then(res => res.json())
		.then(res => {
			console.log(res);
		})
		.catch(err => console.log(err))
	}
  render() {
    return (
		<div>
		</div>
    );
  }
}

export default Book;
