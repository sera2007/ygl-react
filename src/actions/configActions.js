export var loadAccountConfig = (config) => {
	return {
		type: "LOAD_ACCOUNT_CONFIG",
		config
	};
};

export var startLoadAccountConfig = () => {
	return (dispatch, getState) => {
		// transform the elements into encoded key-value-pairs
		const apiUrl = process.env.REACT_APP_YGL_API_DOMAIN + "accounts/config?temp-secret=ToggieRocks123BuggySucks";

		return fetch(apiUrl, {
			'method': 'get',
			'mode': 'cors'
		}).then((res) => {
			return res.json();
		}).then((config) => {
			console.log('config', config);
			dispatch(loadAccountConfig(config));
		});
	};
};