import React, { Component } from 'react';

export default class CustomTooltip extends Component {
    getReactContainerClasses() {
        return ['custom-tooltip'];
    }

    render() {
        const data = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex).data;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: this.props.color || 'white' }}>
                <p><span>{data.name}</span></p>
                <p><span>Id: </span> {data.custId}</p>
                <p><span>Mobile: </span> {data.mobileNumber}</p>
                <p><span>Email: </span> {data.emailId}</p>
                <p style={{ wordBreak: "break-all" }}>Vechicles: {data.vechicleNumbers}</p>
                <p><span style={{ wordBreak: "break-all" }}>Vechicle Details: </span> {data.vechicleDetails}</p>
            </div>
        );
    }
}