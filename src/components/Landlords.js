import React from "react";
import * as Redux from 'react-redux';

import LandlordsSearch from './LandlordsSearch'
import SearchControls from './SearchControls'
import LandlordResultsDisplay from './LandlordResultsDisplay'
import * as searchActions from './../actions/searchActions';

export class Landlords extends React.Component {
	componentWillMount() {
		var {dispatch, search} = this.props;

		if (search.type !== "Landlords") {
			dispatch(searchActions.clearSearchResults());
		}
	}

	render() {
		return (
			<div className="landlords">
				<LandlordsSearch />
				<SearchControls type="Landlords" />
				<LandlordResultsDisplay />
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(Landlords);