import React, { Component } from "react";
import "./loading.css";

/**
 * Loading screen that will disallow the user to click anything on the screen until it goes away
 *
 * *Required
 * @param loading (boolean) Whether to show the loading screen
 */
class Loading extends Component {
	state = {};
	render() {
		function Screen(props) {
			if (!props.loading) return null;
			else
				return (
					<div className="loading-holder">
						<div className="loading-holder">
							<div className="loading">
								<div className="loading-dot one"></div>
								<div className="loading-dot two"></div>
								<div className="loading-dot three"></div>
								<div className="loading-dot four"></div>
								<div className="loading-dot five"></div>
							</div>
						</div>
					</div>
				);
		}
		return <Screen {...this.props} />;
	}
}

export default Loading;
