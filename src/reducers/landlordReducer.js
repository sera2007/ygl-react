export var landlordReducer = (state = null, action) => {
	switch(action.type) {
		case "GET_LANDLORD": 
			return action.landlord;
		default:
			return state;
	}
}