import * as Redux from 'redux';
import Thunk from 'redux-thunk';
import {searchReducer} from './../reducers/searchReducer';
import {configReducer} from './../reducers/configReducer';
import {landlordReducer} from './../reducers/landlordReducer';
import {leadReducer} from './../reducers/leadReducer';

export var configure = (initialState = {}) => {
	var reducer = Redux.combineReducers({
		search: searchReducer,
		config: configReducer,
		landlord: landlordReducer,
		lead: leadReducer
	});

	var store = Redux.createStore(reducer, initialState, Redux.compose(
		Redux.applyMiddleware(Thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
};