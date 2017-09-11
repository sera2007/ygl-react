import React from "react";
import * as Redux from 'react-redux';

import Search from './Search';
import * as searchActions from './../actions/searchActions';
import * as configHelper from './../helpers/configHelper';
import * as configActions from './../actions/configActions';
import loadingIcon from './../images/loading.gif';

export class LeadsSearch extends Search {
	componentWillMount() {
		var {dispatch, config} = this.props;
		if (!config.isLoaded) {
			dispatch(configActions.startLoadAccountConfig());
		}
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
		dispatch(searchActions.startSearchLeads());
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

		var renderTagOptions = (tags) => {
			var count = 0;
			return tags.map((tag) => {
				return (<option key={tag.id} value={tag.id}>{tag.tag}</option>);
			});
		}

		var renderTags = () => {
			if (config.available_lead_tags && config.available_lead_tags.length > 0) {
				return (
					 <div className="cell">
				      	<label>Tag
				        	<select name="tag">
				        		<option value="">Any</option>
				        		{renderTagOptions(config.available_lead_tags)}
				        	</select>
				      	</label>
				    </div>
			    );
			} else {
				return (<div></div>);
			}
		}

		var renderAgents = () => {
			return config.agents.map((item) => {
				return (
					<option key={item.id} value={item.id}>{configHelper.nameDisplay(item)}</option>
				);
			});
		}

		var renderStatuses = () => {
			return Object.keys(config.lead_statuses).map((k) => {
				var count = 0;
				return (
					<option key={k} value={k}>{config.lead_statuses[k]}</option>
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
				      	<label>Email
				        	<input type="text" name="email" />
				      	</label>
				    </div>
				    <div className="cell">
				      	<label>Status
				        	<select name="status">
				        		<option value="">All</option>
				        		{renderStatuses()}
				        	</select>
				      	</label>
				    </div>
				    {renderTags()}
				    <div className="cell">
				      	<label>User
				        	<select name="user">
				        		<option value="">All</option>
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
)(LeadsSearch);