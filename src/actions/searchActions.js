export var handleSearchForm = (parameters) => {
	return {
		type: "SUBMIT_SEARCH_FORM",
		parameters
	}
};

export var togglePage = (page) => {
	return {
		type: "TOGGLE_PAGE",
		page
	}
};

export var toggleSort = (sidx, sord) => {
	return {
		type: "TOGGLE_SORT",
		sidx,
		sord,
	}
};

export var clearSearchResults = () => {
	return {type: "CLEAR_SEARCH_RESULTS"};
}

export var searchLandlords = (results) => {
	return {
		type: "SEARCH_LANDLORDS",
		results
	};
};

export var startSearchLandlords = () => {
	return (dispatch, getState) => {
		// transform the elements into encoded key-value-pairs
		const parameters = getState().search.parameters;
		console.log('search parameters', parameters);
		const parameterStr = Object.keys(parameters).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(parameters[k])).join('&');  
        const apiUrl = process.env.REACT_APP_YGL_API_DOMAIN + "landlords" + "?" + parameterStr + "&temp-secret=ToggieRocks123BuggySucks";

		return fetch(apiUrl, {
			'method': 'get',
			'mode': 'cors'
		}).then((res) => {
			return res.json();
		}).then((results) => {
			console.log('results', results);
			dispatch(searchLandlords(results));
		});
	};
};

export var searchLeads = (results) => {
	return {
		type: "SEARCH_LEADS",
		results
	};
};

export var startSearchLeads = () => {
	return (dispatch, getState) => {
		// transform the elements into encoded key-value-pairs
		const parameters = getState().search.parameters;
		console.log('search parameters', parameters);
		const parameterStr = Object.keys(parameters).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(parameters[k])).join('&');  
        const apiUrl = process.env.REACT_APP_YGL_API_DOMAIN + "leads" + "?" + parameterStr + "&temp-secret=ToggieRocks123BuggySucks";

		return fetch(apiUrl, {
			'method': 'get',
			'mode': 'cors'
		}).then((res) => {
			return res.json();
		}).then((results) => {
			console.log('results', results);
			dispatch(searchLeads(results));
		});
	};
};
