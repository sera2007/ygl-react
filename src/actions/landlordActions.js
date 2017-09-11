export var getLandlord = (landlord) => {
	return {
		type: "GET_LANDLORD",
		landlord
	};
};

export var startGetLandlord = (id) => {
	return (dispatch, getState) => {
		const apiUrl = process.env.REACT_APP_YGL_API_DOMAIN + "landlords/" + id + "?include_rental_counts=Y&include_tags=Y&include_comments=Y&include_documents=Y&temp-secret=ToggieRocks123BuggySucks";

		return fetch(apiUrl, {
			'method': 'get',
			'mode': 'cors'
		}).then((res) => {
			return res.json();
		}).then((landlord) => {
			console.log('landlord', landlord);
			dispatch(getLandlord(landlord));
		});
	};
};