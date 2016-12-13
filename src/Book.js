import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import './App.css';

import Button from './Button.js';

class Book extends Component {
	constructor(){
		super();
		this.state = {
			book: {}
		};
	}
  render() {
    return (
		<div>
			{Object.keys(this.state.book).length !== 0 ?
			<div>
			<GridTile
				title={this.state.book.title}
				subtitle={this.state.book.authors[0].slug}>
				<img
					style={{width: '100%'}}
					src={'https://leseditionsdeparis.com/api/Containers/images/download/'+this.state.book.media.src[1]}
					alt="No image available"
					/>
			/>
			</GridTile>
			<Button
				link="/"
				message="Go back"
			/>
			</div>
			:
			<p>waiting...</p>
			}
		</div>
    );
  }
}

export default Book;
