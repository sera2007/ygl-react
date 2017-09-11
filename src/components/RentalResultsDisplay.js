import React from "react";
import * as Redux from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import * as configHelper from './../helpers/configHelper';
import houseGreyIcon from './../images/house-grey-icon.gif';
import houseGreenIcon from './../images/house-green-icon.gif';
import houseOrangeIcon from './../images/house-orange-icon.gif';
import houseRedIcon from './../images/house-red-icon.gif';
import bedsIcon from './../images/beds-icon.gif';
import bathIcon from './../images/bath-icon.gif';
import calendarIcon from './../images/calendar-icon.gif';
import removeIcon from './../images/remove-icon.svg';

const moment = extendMoment(Moment);

export class RentalResultsDisplay extends React.Component {
	render() {
		var {config, rentals} = this.props;

		var renderStatusIcon = (rental) => {
			switch(rental.status) {
				case "ONMARKET" : 
					return (<img alt='house green icon' src={houseGreenIcon} />);
				case "APP" : 
					return (<img alt='house green icon' src={houseOrangeIcon} />);
				case "OFFMARKET" : 
					return (<img alt='house green icon' src={houseRedIcon} />);
				default:
					return (<img alt='house green icon' src={houseGreyIcon} />);
			}
		};

		var renderAvailableDate = (listDate) => {
			if (listDate !== null) {
				var date = moment(listDate);
				var now = new moment();
				if (now.unix() >= date.unix()) {
					const dr = moment.range(date, now);
					return "NOW (" + dr.diff('days') + ")";
				} else {
					return date.format("MM/DD/YYYY");
				}
			} else {
				return "";
			}
		};

		var renderRows = () => {
			if (rentals) {
				return rentals.map((rental) => {
					return (
					<tr key={rental.id}>
						<td className="image_only">
                            {renderStatusIcon(rental)}
						</td>
						<td>
                            {rental.neighborhood && rental.neighborhood.length > 0 ? rental.neighborhood : rental.city}
						</td>
						<td>
                            {rental.street_number} {rental.street_name}, #{rental.unit}
						</td>
						<td>
							${rental.price}
						</td>
						<td>
							<img alt="bed icon" src={bedsIcon} />
                            {configHelper.bedsDisplay(config, rental.beds)}
						</td>
						<td>
							<img alt="bath icon" src={bathIcon} />
                            {rental.baths}
						</td>
						<td>
                            {configHelper.feeDisplay(config, rental.fee)}
						</td>
						<td>
							<img alt="calendar icon" src={calendarIcon} />
                            {renderAvailableDate(rental.list_date)}
						</td>
						<td>
							<a href="#"><img alt="remove icon" src={removeIcon} /></a>
						</td>
					</tr>

					);
				});	
			} else {
				return "-";
			}
		};

		return (
			<div className="search-results-pane">
				<table className="bordered-table">{renderRows()}</table>
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(RentalResultsDisplay);