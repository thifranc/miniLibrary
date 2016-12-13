import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

import Button from './Button.js';

class Home extends Component {
	constructor(){
		super();
		this.state = {
			search: '',
			books: []
		};
		this.handleFillChar = this.handleFillChar.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
	componentDidMount() {
		var Promise = require("bluebird");
		fetch('/api/Books?filter={"include":["authors", "media"], "limit":20}')
		.then(res => res.json())
		.then(res => {
			res.forEach(book => {
				book.hidden = false;
				book.authors[0].slug = book.authors[0].slug
										.toLowerCase()
										.split('-')
										.join(' ');
			})
			this.setState({books:res});
		})
		.catch(err => console.log(err))
	}
	handleFillChar(e) {
		this.setState({search: e.target.value});
	}
	handleSearch() {
		var books = this.state.books;
		books.forEach(book => {
			book.authors[0].slug.search(this.state.search) ?
				book.hidden = true :
				book.hidden = false;
		})
		this.setState({books:books});
	}
	handleKey(e) {
		if (e.key === 'Enter') {
			console.log(this.state.books);
			this.handleSearch();
		}
	}
  render() {
    return (
		<div>
			<TextField
				value={this.state.search}
				onChange={this.handleFillChar}
				floatingLabelText="Search"
				hintText="Author name"
				onKeyDown={this.handleKey}
				/>
			<RaisedButton
				label="Search !"
				onClick={this.handleSearch}
				/>
				<GridList cellHeight={'auto'} cols={5}>
					{this.state.books.length > 0 ?
						this.state.books.map( (book, id) => ( 
						<GridTile
							key={id}
							style={book.hidden ? {display:"none"} : {display:"true"}}
							title={book.title + ' ' + book.authors[0].slug}
							subtitle={
								<Button
									link={'/book/'+id}
									message="View more"
								/>
							}>
							<img
								style={{width: '100%'}}
								src={'https://leseditionsdeparis.com/api/Containers/images/download/'+book.media.src[1]}
								alt="No image available"
								/>
						</GridTile>
						))
						:
						<p>No books</p>
					}
				</GridList>
		</div>
    );
  }
}

export default Home;
