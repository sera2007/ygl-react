export var leadReducer = (state = null, action) => {
	switch(action.type) {
		case "GET_LEAD": 
			return action.lead;
		default:
			return state;
	}
}