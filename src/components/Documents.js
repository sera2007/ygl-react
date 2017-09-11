import React from "react";
import * as Redux from 'react-redux';
import Moment from 'moment'

export class Documents extends React.Component {
	render() {
		var {landlord} = this.props;

		var renderDocuments = () => {
			if (landlord && landlord.documents && landlord.documents.length > 0) {
				return landlord.documents.map((doc) => {
					var createdAt = "N/A";
					if (doc.created_at !== null) {
						createdAt = Moment(doc.created_at).format('MM/DD/YYYY H:mm');
					}
					var note = "";
					if (doc.note !== null && doc.note !== "") {
						note = <div className="note">{doc.note}</div>;
					}

					return (
						<div key={doc.id} className="item">
							{doc.title}
							{note}
							<div className="meta">Uploaded on {createdAt}</div>
						</div>);
				});
			} else {
				return (<div>-</div>);
			}
		};

		return (
			<div className="info-pane">
				<div className="header">
					Documents
				</div>
				<div className="body">
					{renderDocuments()}
				</div>
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(Documents);