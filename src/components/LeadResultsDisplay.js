import React from "react";
import * as Redux from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import * as configHelper from './../helpers/configHelper';
import phoneIcon from './../images/phone-icon.gif';
import bedsIcon from './../images/beds-icon.gif';
import calendarIcon from './../images/calendar-icon.gif';
import refreshIcon from './../images/refresh-icon.gif';

const moment = extendMoment(Moment);

export class LeadResultsDisplay extends React.Component {
	render() {
		var {search, config} = this.props;

		var renderRows = () => {
			return search.items.map(function(item) {
				var linkTo = `/leads/${item.id}`;

				var renderPrice = () => {
					if (item.price_max !== null)
						return "$" + item.price_max;
					else
						return "";
				};

				var renderMoveDates = () => {
					return (
						<span>
							<label className="move-date">{item.move_from_date}</label> 
							- 
							<label className="move-date">{item.move_to_date}</label>
						</span>
					);
				};

				var renderAge = () => {
					var updated_at = moment(item.updated_at);
					var now = new moment();
					const dr = moment.range(updated_at, now);
					return dr.diff('days') + " days";
				};

				var renderUser = () => {
					if (item.agent_id) {
						for (var i = config.agents.length - 1; i >= 0; i--) {
							if (config.agents[i].id === item.agent_id) {
								return configHelper.nameDisplay(config.agents[i]);
							}
						}

						return "Unknown";
					}
					else {
						return "Unassigned";
					}
				}

				return (
					<div key={item.id} className="grid-x">
						<div className="cell large-6">
							<div className="grid-x">
								<div className="cell large-4">
									<input type="checkbox" className="item-selector" />
									<Link to={linkTo}>{configHelper.nameDisplay(item)}</Link>
								</div>
								<div className="cell large-3">
									<img src={phoneIcon} className="item-icon" alt="Phone Icon" />
									{item.phone1}
								</div>
								<div className="cell large-3">
									{item.email}
								</div>
								<div className="cell large-1">
									<img src={bedsIcon} className="item-icon" alt="Beds Icon" />
									{item.beds}
								</div>
								<div className="cell large-1">
									{renderPrice()}
								</div>
							</div>
						</div>
						<div className="cell large-6">
							<div className="grid-x">
								<div className="cell large-5">
									<img src={calendarIcon} className="item-icon" alt="Calendar Icon" />
									{renderMoveDates()}
								</div>
								<div className="cell large-1">
									{config.lead_statuses[item.status]}
								</div>
								<div className="cell large-2">
									<img src={refreshIcon} className="item-icon" alt="Refresh Icon" />
									{renderAge()}
								</div>
								<div className="cell large-4">
									{renderUser()}
								</div>
							</div>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="search-results-pane">
				{renderRows()}
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(LeadResultsDisplay);