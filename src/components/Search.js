import React from "react";

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		e.preventDefault();
	}

	renderSearchForm() {
		return (
			<div>No Search Form Defined!</div>
		);
	}

	render() {
		return (
			<div className="callout search-pane">
				{this.renderSearchForm()}
			</div>
		);
	}
}