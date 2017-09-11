import React from "react";
import * as Redux from 'react-redux';

import Tags from './Tags';
import * as leadActions from './../actions/leadActions';
import * as configHelper from './../helpers/configHelper';
import * as configActions from './../actions/configActions';
import RentalResultsDisplay from './RentalResultsDisplay'
import editIcon from './../images/edit-icon.svg';
import plusIcon from './../images/plus-icon.svg';
import printIcon from './../images/print-icon.svg';
import copyIcon from './../images/copy-icon.svg';
import calendarIcon2 from './../images/calendar-icon2.svg';
import alarmIcon from './../images/alarm-icon.svg';
import alarmIconRed from './../images/alarm-icon-red.svg';
import trashIcon from './../images/trash-icon.png';
import helpIcon from './../images/help-icon.svg';
import messageIcon from './../images/message-icon.svg';
import userImg from './../images/user-img.png';
import hamburgerIcon from './../images/hamburger-icon.svg';

export class LeadDetails extends React.Component {
	componentWillMount() {
		var {config, dispatch, match} = this.props;

		if (!config.isLoaded) {
			dispatch(configActions.startLoadAccountConfig()).then(() => {
				dispatch(leadActions.startGetLead(match.params.id));
			});
		} else {
			dispatch(leadActions.startGetLead(match.params.id));
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		var {lead, config} = this.props;

		var renderCritera = () => {
			if (lead && lead.rental_criteria && lead.rental_criteria.length > 0) {
				const criteria = lead.rental_criteria[0];
				return (
					<div className="body">
						<div><label># Beds:</label> {configHelper.bedsDisplay(config, criteria.beds)}</div>
						<div><label># Baths:</label> {criteria.bath_min}</div>
						<div><label>Rent:</label> {'$' + criteria.price_min + ' - $' + criteria.price_max}</div>
						<div><label>Move In:</label> {(criteria.move_from_date ? criteria.move_from_date : '') + ' - ' + (criteria.move_to_date ? criteria.move_to_date : '')}</div>
						<div><label>Pet:</label> {criteria.pet}</div>
						<div><label>Cities:</label> {criteria.cities && criteria.cities.length > 0 ? criteria.cities.join(', ') : ""}</div>
						<div><label>POI:</label> {criteria.poi ? criteria.poi.replace(',', ', ') : ""}</div>
					</div>
				);
			} else {
				return (<div></div>);
			}
		};

		return (
			<div className="grid-x grid-margin-x">
				<div className="small-12 medium-8 cell content-top-menu show-for-medium">
					<a href="#" className="button secondary">Client Sheet</a>
					<a href="#" className="button secondary">Showing Sheet</a>
					<a href="#" className="button secondary">Delete</a>
					<a href="#" className="button secondary">Assign to</a>
				</div>
				<div className="small-4 cell mobile-view-hamburger">
					<button type="button" data-toggle="offCanvasLeft"><img src={hamburgerIcon} alt="{hamburgerIcon}"/></button>
				</div>
				<div className="small-4 cell hide-for-medium-only hide-for-large-only mobile-view-title">Leads</div>
				<div className="small-4 cell medium-4 cell content-top-right-menu mobile-view-toolbar">
					<div className="item  hide-for-small-only">
						<a href="#"><img src={helpIcon} alt="{helpIcon}"/></a>
					</div>
					<div className="item active">
						<a href="#"><img src={messageIcon} alt="{messageIcon}"/></a>
					</div>
					<div className="item has-menu">
						<a href="#"><img src={userImg} alt="{userImg}"/></a>
					</div>
				</div>
				<div className="small-12 medium-8 cell">
					<div className="info-pane">
						<div className="header">
							<div className="text-move-left">{lead ? configHelper.nameDisplay(lead) : 'Lead Name' }</div>
							<div className="text-move-right"><button type="button" className="secondary button"><img src={editIcon} className="item-icon" alt="Phone Icon" /></button>
							</div>
						</div>
						<div className="body">
							<div><label>ID:</label> {lead ? lead.id : '-'}</div>
							<div><label>Status:</label> {lead ? config.lead_statuses[lead.status] : '-'}</div>
							<div><label>Source:</label> {lead ? lead.source : '-' }</div>
							<div><label>Phone:</label> {lead && lead.phone1 ? lead.phone1 : '-'}</div>
							<div><label>Email:</label> {lead && lead.email ? lead.email : '-'}</div>
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							<div className="text-move-left">Search Criteria</div>
							<div className="text-move-right"><button type="button" className="secondary button"><img src={editIcon} className="item-icon" alt="Phone Icon" /></button>
							</div>
						</div>
						{renderCritera()}
					</div>


					<div className="info-pane">
						<div className="header">
							<div className="text-move-left">Recommended Rentals</div>
							<div className="text-move-right">
								<button type="button" className="secondary button"><img src={printIcon} className="item-icon" alt="Phone Icon" /></button>
								<button type="button" className="secondary button"><img src={plusIcon} className="item-icon" alt="Phone Icon" /></button>
							</div>
						</div>
						<div className="body">
							<div className="public_url">Public Url: <a href="">http://ag099026.speedhatch.com/rentals/1468581
								<img alt="{copyIcon}" src={copyIcon} /></a>
							</div>
							<RentalResultsDisplay rentals={lead ? lead.recommended_rentals : []} />
						</div>
						<div className="load_more"></div>
					</div>

					<div className="copyrights">
						© 2016 YouGotListings. All Rights Reserved. Terms of Service
					</div>

					<div className="grid-x grid-margin-x">
						<div className="cell medium-6">
							<div className="info-pane">
								<div className="header">
									<div className="text-move-left">Notes <img src={calendarIcon2} alt="{calendarIcon2}"/></div>
									<div className="text-move-right"><button type="button" className="secondary button"><img src={plusIcon} className="item-icon" alt="Phone Icon" /></button></div>
								</div>
								<div className="body">
                                    {/*{lead && lead.note ? lead.note : '-'}*/}
									<div className="note_item">
										<div className="text">
											Test 1         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<p>
											<input type="checkbox" id="alarm_4"/>
											<label htmlFor="alarm_4"> <span><img src={alarmIcon} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
										</p>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
									<div className="note_item">
										<div className="text">
											Test 2         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<p>
											<input type="checkbox" id="alarm_5"/>
											<label htmlFor="alarm_5"> <span><img src={alarmIconRed} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
										</p>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
									<div className="note_item">
										<div className="text">
											Test 3         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="cell medium-6">
							<div className="info-pane">
								<div className="header">
									<div className="text-move-left">Notes <img src={calendarIcon2} alt="{calendarIcon2}"/></div>
									<div className="text-move-right"><button type="button" className="secondary button"><img src={plusIcon} className="item-icon" alt="Phone Icon" /></button></div>
								</div>
								<div className="body">
                                    {/*{lead && lead.note ? lead.note : '-'}*/}
									<div className="note_item">
										<div className="text">
											Test 1         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<p>
											<input type="checkbox" id="alarm_6"/>
											<label htmlFor="alarm_6"> <span><img src={alarmIcon} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
										</p>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
									<div className="note_item">
										<div className="text">
											Test 2         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<p>
											<input type="checkbox" id="alarm_7"/>
											<label htmlFor="alarm_7"> <span><img src={alarmIconRed} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
										</p>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
									<div className="note_item">
										<div className="text">
											Test 3         Unsubscribe <br/>
											To: 099026speedhatch@goto.com <br/>
											Send Time: 10/16/2016 11:41pm <br/>
										</div>
										<div className="buttons">
											<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
											<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="small-12 medium-4 cell side-pane">
					<Tags tags={lead ? lead.tags : []} />

					<div className="info-pane">
						<div className="header">
							<div className="text-move-left">Notes <img src={calendarIcon2} alt="{calendarIcon2}"/></div>
							<div className="text-move-right"><button type="button" className="secondary button"><img src={plusIcon} className="item-icon" alt="Phone Icon" /></button></div>
						</div>
						<div className="body">
                            {/*{lead && lead.note ? lead.note : '-'}*/}
							<div className="note_item">
								<div className="text">
									Test 1         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
								</div>
								<p>
									<input type="checkbox" id="alarm_1"/>
									<label htmlFor="alarm_1"> <span><img src={alarmIcon} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
								</p>
								<div className="buttons">
									<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
									<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
								</div>
							</div>
							<div className="note_item">
								<div className="text">
									Test 2         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
								</div>
								<p>
									<input type="checkbox" id="alarm_2"/>
									<label htmlFor="alarm_2"> <span><img src={alarmIconRed} alt="{alarmIcon}"/> Alert: 02/27/2017</span> </label>
								</p>
								<div className="buttons">
									<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
									<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
								</div>
							</div>
							<div className="note_item">
								<div className="text">
									Test 3         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
								</div>
								<div className="buttons">
									<a href="#"><img src={trashIcon} alt="{trashIcon}"/></a>
									<a href="#"><img src={editIcon} alt="{trashIcon}"/></a>
								</div>
							</div>
						</div>
					</div>

					<div className="info-pane">
						<div className="header">
							<div className="text-move-left">Email </div>
							<div className="text-move-right"></div>
						</div>
						<div className="body">
                            {/*{lead && lead.note ? lead.note : '-'}*/}
							<div className="note_item">
								<div className="text">
									Test 1         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
									To: rentals1468581@hotmail.com <br/>
									Send Time: -
								</div>
							</div>
							<div className="note_item">
								<div className="text">
									Test 2         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
									To: rentals1468581@hotmail.com <br/>
									Send Time: -
								</div>
							</div>
							<div className="note_item">
								<div className="text">
									Test 3         Unsubscribe <br/>
									To: 099026speedhatch@goto.com <br/>
									Send Time: 10/16/2016 11:41pm <br/>
									To: rentals1468581@hotmail.com <br/>
									Send Time: -
								</div>
							</div>

							<ul className="tabs" data-responsive-accordion-tabs="tabs medium-accordion large-tabs" id="example-tabs">
								<li className="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
								<li className="tabs-title"><a href="#panel2">Tab 2</a></li>
								<li className="tabs-title"><a href="#panel3">Tab 3</a></li>
								<li className="tabs-title"><a href="#panel4">Tab 4</a></li>
								<li className="tabs-title"><a href="#panel5">Tab 5</a></li>
								<li className="tabs-title"><a href="#panel6">Tab 6</a></li>
							</ul>

							<div className="tabs-content" data-tabs-content="example-tabs">
								<div className="tabs-panel is-active" id="panel1">
									<p>one</p>
									<p>Check me out! I'm a super cool Tab panel with text content!</p>
								</div>
								<div className="tabs-panel" id="panel2">
									<p>two</p>
								</div>
								<div className="tabs-panel" id="panel3">
									<p>three</p>
									<p>Check me out! I'm a super cool Tab panel with text content!</p>
								</div>
								<div className="tabs-panel" id="panel4">
									<p>four</p>

								</div>
								<div className="tabs-panel" id="panel5">
									<p>five</p>
									<p>Check me out! I'm a super cool Tab panel with text content!</p>
								</div>
								<div className="tabs-panel" id="panel6">
									<p>six</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Redux.connect(
	(state) => {
		return state;
	}
)(LeadDetails);