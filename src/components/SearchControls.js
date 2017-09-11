import React from "react";
import * as Redux from 'react-redux';

import * as searchActions from './../actions/searchActions';
import leftArrowIcon from './../images/left-arrow-icon.gif';
import rightArrowIcon from './../images/right-arrow-icon.gif';

export class SearchControls extends React.Component {
	constructor(props) {
		super(props);

		this.handleNextPage = this.handleNextPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}

	handleNextPage(e) {
		e.preventDefault();
		var {dispatch, search} = this.props;
		dispatch(searchActions.togglePage(search.parameters.page+1));
		this.startSearch();
	}

	handlePreviousPage(e) {
		e.preventDefault();
		var {dispatch, search} = this.props;
		dispatch(searchActions.togglePage(search.parameters.page-1));
		this.startSearch();
	}

	startSearch() {
		var {type, dispatch} = this.props;

		if (type == "Landlords")
			dispatch(searchActions.startSearchLandlords());
		else if (type == "Leads")
			dispatch(searchActions.startSearchLeads());
	}

	handleSort(e) {
		e.preventDefault();
		var {dispatch} = this.props;
		var sortVal = this.refs.sortControl.value;
		var sortParts = sortVal.split(' ');
		if (sortParts.length === 2) {
			const sidx = sortParts[0];
			const sord = sortParts[1];
			dispatch(searchActions.toggleSort(sidx, sord));
			dispatch(searchActions.startSearchLandlords());
		}
	}

	render() {
		var {search} = this.props;
		var startCount = () => {
			return search.page > 1 ? (search.page-1) * search.rows + 1 : 1;
		};
		var endCount = () => {
			var endCount = search.page * search.rows;
			return endCount > search.total ? search.total : endCount;
		};
		var renderPaging = () => {
			return (
				<label>
					{startCount()}-{endCount()} of {search.total}
					<img src={leftArrowIcon} alt="Previous Page" className="left-page-control" onClick={this.handlePreviousPage} disabled={search.isSearching} />
					<img src={rightArrowIcon} alt="Next Page" onClick={this.handleNextPage} disabled={search.isSearching} />
				</label>
			);
		}
		var renderSelector = () => {
			return (
				<label>
					<input type="checkbox" className="item-selector" />
					all
				</label>
			);	
		}

		if (search.total > 0) {
			return (
				<div className="search-controls-pane">
					<div className="grid-x">
						<div className="cell large-8">
							{renderSelector()}
						</div>
						<div className="cell large-2">
							{renderPaging()}
						</div>
						<div className="cell large-2">
							<div className="grid-x">
							    <div className="small-3 cell">
							      	<label htmlFor="sort-control" className="text-right">Sort</label>
							    </div>
							    <div className="small-9 cell">
							      	<select id="sort-control" ref="sortControl" disabled={search.isSearching} onChange={this.handleSort}>
										<option value="name asc">Name A-Z</option>
										<option value="name desc">Name Z-A</option>
									</select>
							    </div>
							  </div>
						</div>
					</div>
				</div>
			);
		} else {
			return (<div></div>);
		}
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(SearchControls);