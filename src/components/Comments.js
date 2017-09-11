import React from "react";
import * as Redux from 'react-redux';
import Moment from 'moment'

export class Comments extends React.Component {
	render() {
		var {landlord} = this.props;


		var renderComments = () => {
			if (landlord && landlord.comments && landlord.comments.length > 0) {
				return landlord.comments.map((comment) => {
					var createdAt = "N/A";
					if (comment.created_at !== null) {
						createdAt = Moment(comment.created_at).format('MM/DD/YYYY H:mm');
					}

					return (
						<div key={comment.id} className="item">
							{comment.comment}
							<div className="meta">Created by {comment.created_by} on {createdAt}</div>
						</div>);
				});
			} else {
				return (<div>-</div>);
			}
		};

		return (
			<div className="info-pane">
				<div className="header">
					Comments
				</div>
				<div className="body">
					{renderComments()}
				</div>
			</div>
		);
	}
}

export default Redux.connect(
	(state) => {
		return state;
	}
)(Comments);