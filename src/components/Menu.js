import React from "react";
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.png';

export default class Menu extends React.Component {
	render() {
		return (
			<div className="nav-bar">
				<div className="nav-bar-top">
					<NavLink className="logo" exact to="/"><img src={logo} alt={"logo"}/></NavLink>
				</div>
				<div className="nav-bar-bottom">
					<ul className="vertical menu">
						<li><NavLink activeClassName="active" exact to="/">Dashboard</NavLink></li>
						<li><NavLink activeClassName="active" to="/rentals">Rentals</NavLink></li>
						<li><NavLink activeClassName="active" to="/leads">Leads</NavLink></li>
						<li><NavLink activeClassName="active" to="/landlords">Landlords</NavLink></li>
						<li><a href="#" className="more">More</a></li>
					</ul>
				</div>
			</div>
		);
	}
}