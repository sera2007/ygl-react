import React from "react";
import * as Redux from 'react-redux';

export default class Tags extends React.Component {
	render() {
		var {tags} = this.props;


		var renderTags = () => {
			if (tags && tags.length > 0) {
				return tags.map((tag) => {
					return (<span key={tag.id} className="label">{tag.name}</span>);
				});
			} else {
				return (<div>-</div>);
			}
		};

		return (
			<div className="info-pane">
				<div className="header">
					Tags
				</div>
				<div className="body">
					{renderTags()}
				</div>
			</div>
		);
	}
}
