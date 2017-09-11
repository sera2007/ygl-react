export var getLead = (lead) => {
	return {
		type: "GET_LEAD",
		lead
	};
};

export var startGetLead = (id) => {
	return (dispatch, getState) => {
		const apiUrl = process.env.REACT_APP_YGL_API_DOMAIN + "leads/" + id + "?temp-secret=ToggieRocks123BuggySucks&include_tags=Y&include_recommended_rentals=Y";

		return fetch(apiUrl, {
			'method': 'get',
			'mode': 'cors'
		}).then((res) => {
			return res.json();
		}).then((lead) => {
			console.log('lead', lead);
			dispatch(getLead(lead));
		});
	};
};