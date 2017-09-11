var emptyConfig = {
	isLoaded: false,
	rental_sources: [],
	agents: [],
	available_lead_tags: [],
	lead_statuses: [],
	bed_types: [],
	fee_types: [],
};

export var configReducer = (state = emptyConfig, action) => {
	switch(action.type) {
		case "LOAD_ACCOUNT_CONFIG": 
			return {...state, ...action.config, isLoaded:true};
		default:
			return state;
	}
}