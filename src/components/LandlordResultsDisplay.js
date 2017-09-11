import React from "react";
import * as Redux from 'react-redux';
import {Link} from 'react-router-dom';

import * as addressHelper from './../helpers/addressHelper';
import phoneIcon from './../images/phone-icon.gif';
import faxIcon from './../images/print-icon.gif';
import alarmIconGrey from './../images/alarm-icon-grey.gif';

export class LandlordResultsDisplay extends React.Component {
	render() {
		var {search} = this.props;

		var renderRows = () => {
			return search.items.map(function(item) {
				var linkTo = `/landlords/${item.id}`;
				return (
					<div key={item.id} className="grid-x">
						<div className="cell large-6">
							<div className="grid-x">
								<div className="cell large-6">
									<input type="checkbox" className="item-selector" />
									<Link to={linkTo}>{item.name}</Link>
								</div>
								<div className="cell large-3">
									<img src={phoneIcon} className="item-icon" alt="Phone Icon" />
									{item.phone1}
								</div>
								<div className="cell large-3">
									<img src={faxIcon} className="item-icon" alt="Fax Icon" />
									{item.fax1}
								</div>
							</div>
						</div>
						<div className="cell large-6">
							<div className="grid-x">
								<div className="cell small-3 medium-2 large-5">
									{item.email}
								</div>
								<div className="cell small-6 medium-4 large-6">
									{ addressHelper.formatAddress(item.address1, item.address2, item.city, item.state, item.zip) }
								</div>
								<div className="cell small-1 medium-1 large-1 postfix-icon-cell">
									<img src={alarmIconGrey} alt="Alarm Icon" />
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
)(LandlordResultsDisplay);