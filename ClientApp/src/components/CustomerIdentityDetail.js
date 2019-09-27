import React from 'react';

const CustomerIdentityDetail = ({ items }) => {
    let item = (items && items.selected && items.detail[items.selected]) || {};
    return (item ? (
        <div className="row">
            <div className="col-sm-6 viewcustomer">
                <div>
                    <span>A/C No:</span>
                    <span>{item.acFormat + item.acNo}</span>
                </div>
                <div>
                    <span>Name:</span>
                    <span>{item.name}</span>
                </div>
                <div>
                    <span>Address:</span>
                    <span>{item.address}</span>
                </div>
            </div>
            <div className="col-sm-6 viewcustomer">
                <div>
                    <span>Mobile No:</span>
                    <span>{item.mobileNumber}</span>
                </div>
                <div>
                    <span>Email Id:</span>
                    <span>{item.emailId}</span>
                </div>
            </div>
        </div>
    ) : (
            <div>Select a name to view detail</div>
        )
    );
};
export default CustomerIdentityDetail;
