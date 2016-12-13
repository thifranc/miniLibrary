import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
		<div style={{backgroundColor:"red"}}>
			<a href={this.props.link}>
				{this.props.message}
			</a>
		</div>
    );
  }
}

export default Button;
