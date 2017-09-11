import React from "react";
import * as Redux from 'react-redux';

import LeadsSearch from './LeadsSearch'
import SearchControls from './SearchControls'
import LeadResultsDisplay from './LeadResultsDisplay'
import * as searchActions from './../actions/searchActions';

export class Leads extends React.Component {
	componentWillMount() {
		var {dispatch, search} = this.props;

		if (search.type !== "Leads") {
			dispatch(searchActions.clearSearchResults());
		}
	}

	render() {
		return (
			<div className="leads">
				<LeadsSearch />
				<SearchControls type="Leads" />
				<LeadResultsDisplay />
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(Leads);