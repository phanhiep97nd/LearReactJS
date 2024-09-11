import React, { Component } from 'react';

class CounterClass extends Component {
		constructor(props) {
				super(props);
				// state
				this.state = {
						count: 0,
				};
		}

		// set state function
		incrementCount = () => {
				this.setState({ count: this.state.count + 1 });
		};

		render() {
				return (
						<div>
								<p>Count: {this.state.count}</p>
								<button onClick={this.incrementCount}>Increment</button>
						</div>
				);
		}
}

export default CounterClass;
