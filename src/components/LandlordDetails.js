import React from "react";
import * as Redux from 'react-redux';

import Tags from './Tags';
import Comments from './Comments';
import Documents from './Documents';
import * as landlordActions from './../actions/landlordActions';
import * as configHelper from './../helpers/configHelper';
import * as addressHelper from './../helpers/addressHelper';

export class LandlordDetails extends React.Component {
	componentWillMount() {
		var {dispatch, match} = this.props;
		dispatch(landlordActions.startGetLandlord(match.params.id));
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		var {landlord, config} = this.props;

		var getListingAgentName = () => {
			if (landlord && landlord.listing_agent_id) {
				config.agents.forEach((agent) => {
					if (agent.id === landlord.listing_agent_id)
						return configHelper.nameDisplay(agent);
				});
			} 
				
			return "-";
		};

		return (
			<div className="grid-x">
				<div className="small-12 cell details-control-pane">
					<button className="button secondary">Report Inaccuracy</button>
					<button className="button secondary">Updates History</button>
				</div>
				<div className="small-12 medium-8 cell">
					<div className="info-pane">
						<div className="header">
							{landlord ? landlord.name : 'Landlord Name' }
						</div>
						<div className="body">
							<div><label>ID:</label> {landlord ? landlord.id : '-'}</div>
							<div><label>Source:</label> {landlord ? configHelper.sourceName(landlord.type) : '-' }</div>
							<div><label>Listing Agent:</label> {getListingAgentName()}</div>
							<div><label>Primary Phone:</label> {landlord && landlord.phone1 ? landlord.phone1 : '-'}</div>
							<div><label>Secondary Phone:</label> {landlord && landlord.phone2 ? landlord.phone2 : '-'}</div>
							<div><label>Email:</label> {landlord && landlord.email ? landlord.email : '-'}</div>
							<div><label>Fax:</label> {landlord && landlord.fax1 ? landlord.fax1 : '-'}</div>
							<div><label>Website:</label> {landlord && landlord.website ? landlord.website : '-'}</div>
							<div><label>Address:</label> {landlord ? addressHelper.formatObjectAddress(landlord) : '-'}</div>
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							Rentals Summary
						</div>
						<div className="grid-x body">
							<div className="small-12 medium-4 cell"><label>On Market:</label> 
								{landlord && landlord.rental_count_onmarket !== undefined ? landlord.rental_count_onmarket : 0}
							</div>
							<div className="small-12 medium-4 cell"><label>Pending:</label> 
								{landlord && landlord.rental_count_pending !== undefined ? landlord.rental_count_pending : 0}
							</div>
							<div className="small-12 medium-4 cell"><label>Off Market:</label> 
								{landlord && landlord.rental_count_offmarket !== undefined ? landlord.rental_count_offmarket : 0}
							</div>
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							Contact Info
						</div>
						<div className="body">
							{landlord && landlord.contact ? landlord.contact : '-'}
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							Private Notes
						</div>
						<div className="body">
							{landlord && landlord.private_notes ? landlord.private_notes : '-'}
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							Broker Notes
						</div>
						<div className="body">
							{landlord && landlord.notes ? landlord.notes : '-'}
						</div>
					</div>
				</div>

				<div className="small-12 medium-4 cell side-pane">
					<Tags tags={landlord ? landlord.tags : []} />
					<Comments />
					<Documents />
				</div>
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(LandlordDetails);