var emptySearch = {
	total: 0,
	sidx: '',
	sord: '',
	page: 1,
	rows: 100,
	items: [],
	parameters: [],
	isSearching: false,
	type: null
};

export var searchReducer = (state = emptySearch, action) => {
	switch(action.type) {
		case "SUBMIT_SEARCH_FORM":
			for (var key in action.parameters) {
				state.parameters[key] = action.parameters[key];
			}
			state.parameters['page'] = 1;
			state.parameters['rows'] = 100;
			return {...state, isSearching: true};
		case "TOGGLE_PAGE":
			// we need to make sure the search does not go out of bound.
			console.log('toggle page', action.page);
			if (action.page >= 1 && action.page <= Math.ceil(state.total / state.rows)){
				state.parameters['page'] = action.page;
				return {...state, isSearching: true};
			} else {
				return state;
			}
		case "TOGGLE_SORT":
			console.log('toggle sort', action.sidx, action.sord);
			if (action.sidx !== state.parameters.sidx || action.sord !== state.parameters.sord) {
				state.parameters['sidx'] = action.sidx;
				state.parameters['sord'] = action.sord;
				state.parameters['page'] = 1;
				state.parameters['rows'] = 100;
				return {...state, isSearching: true};
			} else {
				return state;
			}
		case "SEARCH_LANDLORDS":
			return {...state, isSearching: false, type:'Landlords', ...action.results};
		case "SEARCH_LEADS":
			return {...state, isSearching: false, type:'Leads', ...action.results};
		case "CLEAR_SEARCH_RESULTS":
			return emptySearch;
		default:
			return state;
	}
};