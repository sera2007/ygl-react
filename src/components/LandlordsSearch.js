import React from "react";
import * as Redux from 'react-redux';

import Search from './Search';
import * as searchActions from './../actions/searchActions';
import * as configActions from './../actions/configActions';
import * as configHelper from './../helpers/configHelper';
import loadingIcon from './../images/loading.gif';

export class LandlordsSearch extends Search {
	componentWillMount() {
		var {dispatch} = this.props;
		dispatch(configActions.startLoadAccountConfig());
	}

	handleSearch(e) {
		super.handleSearch(e);
		var {dispatch} = this.props;
		const formData = new FormData(e.target);
		var parameters = [];
		[...formData.entries()].forEach((element) => {
			parameters[element[0]] = element[1];
		});

		// expand the elements from the .entries() iterator into an actual array
		dispatch(searchActions.handleSearchForm(parameters));
		dispatch(searchActions.startSearchLandlords());
	}

	renderSearchForm() {
		var {search, config} = this.props;

		var renderSearchButton = () => {
			if (search.isSearching || !config.isLoaded) {
				return (<button className="button primary search-button" disabled={true}><img src={loadingIcon} alt="Searching..." /></button>);
			} else {
				return (<button className="button primary search-button" disabled={false}>Search</button>);
			}
		}

		var renderRentalSources = () => {
			return config.rental_sources.filter((item) => {
				if (!configHelper.isMlsSource(item)) {
					return item;
				}
			}).map((item) => {
				return (
					<option key={item} value={item}>{configHelper.sourceName(item)}</option>
				);
			});
		};

		var renderAgents = () => {
			return config.agents.map((item) => {
				return (
					<option key={item.id} value={item.id}>{configHelper.nameDisplay(item)}</option>
				);
			});
		}

		return (
			<form onSubmit={this.handleSearch}>
				<div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-5">
				    <div className="cell">
				      	<label>ID
				        	<input type="text" name="id" />
				      	</label>
				    </div>
				    <div className="cell">
				      	<label>Name
				        	<input type="text" name="name" />
				      	</label>
				    </div>
				    <div className="cell">
				      	<label>Phone
				        	<input type="text" name="phone" />
				      	</label>
				    </div>
				    <div className="cell">
				      	<label>Source
				        	<select name="source">
				        		<option value="">All</option>
				        		{renderRentalSources()}
				        	</select>
				      	</label>
				    </div>
				    <div className="cell">
				      	<label>Listing Agent
				        	<select name="listingAgent">
				        		<option value="">Any</option>
				        		<option value="none">None</option>
				        		{renderAgents()}
				        	</select>
				      	</label>
				    </div>
			  	</div>
			  	<div className="submit-cell">
		  			<button className="button secondary" disabled={search.isSearching || !config.isLoaded}>Clear</button>
	  				{renderSearchButton()}
		  		</div>
			</form>
		);
	}

	render() {
		return super.render();
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(LandlordsSearch);