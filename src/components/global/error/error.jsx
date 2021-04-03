import React, { Component, Fragment } from "react";

import "./error.css";

/**
 * Will popup a little error window
 *
 * *Required
 * @param error (boolean) Whether or not it will be displayed
 * @param message (string) Message that will be displayed in the body
 * @param close (function) Function that will close the popup window
 */
class Error extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props };
	}

	render() {
		function ErrorHolder(props) {
			if (!props.error) return null;
			else
				return (
					<div id="error-container">
						<div id="error-box">
							<div className="error-close" onClick={props.close}></div>
							<div className="error-message">
								<div id="error-header">Error!</div>
								<div id="error-body">{props.message}</div>
							</div>
						</div>
					</div>
				);
		}
		return <ErrorHolder {...this.props} />;
	}
}

export default Error;
