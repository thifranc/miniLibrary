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
		this.filterSearch = this.filterSearch.bind(this);
	}
	componentDidMount() {
		var Promise = require("bluebird");
		fetch('/api/Books?filter={"include":["authors", "media"], "limit":20}')
		.then(res => res.json())
		.then(res => {
			return res.map(book => {
				book.authors[0].slug = book.authors[0].slug
										.toLowerCase()
										.split('-')
										.join(' ');
				return book;
			})
		})
		.then(res => {
			this.setState({books:res});
		})
		.catch(err => console.log(err))
	}
	handleFillChar(e) {
		this.setState({search: e.target.value});
	}
	filterSearch(book) {
		if (book.authors[0].slug.search(this.state.search) === -1)
			return false;
		else
			return true;
	}
	handleKey(e) {
		if (e.key === 'Enter') {
			e.target.blur();
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
						this.state.books.filter(this.filterSearch).map( (book,id) =>
							( 
								<GridTile
									key={id}
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
