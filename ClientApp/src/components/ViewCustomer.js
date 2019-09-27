import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import options from './constants/CustomerType';

class ViewCustomer extends Component {

    formatDate = (dt) => {
        var date = new Date(dt);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    render() {
        const { customerView } = this.props;
        return (
            <div className="row">
                <div className="col-sm-12"><h2>View Customer</h2></div>
                <div className="col-sm-6 viewcustomer">
                    <div>
                        <span>Type:</span>
                        <span>{filter(options, (item) => { if (item.value === customerView.type) return item; }).label}</span>
                    </div>
                    <div>
                        <span>A/C No:</span>
                        <span>{customerView.acFormat + customerView.acNo}</span>
                    </div>
                    <div>
                        <span>Name:</span>
                        <span>{customerView.name}</span>
                    </div>
                    <div>
                        <span>Address:</span>
                        <span>{customerView.address}</span>
                    </div>
                    <div>
                        <span>Landline No:</span>
                        <span>{customerView.landlineNumber}</span>
                    </div>
                    <div>
                        <span>Mobile No:</span>
                        <span>{customerView.mobileNumber}</span>
                    </div>
                    <div>
                        <span>Email Id:</span>
                        <span>{customerView.emailId}</span>
                    </div>
                    <div>
                        <span>DOB:</span>
                        <span>{customerView.dob ? this.formatDate(customerView.dob) : customerView.dob}</span>
                    </div>
                    <div>
                        <span>Wedding Anniversary:</span>
                        <span>{customerView.weddingAnniversary ? this.formatDate(customerView.weddingAnniversary) : customerView.weddingAnniversary}</span>
                    </div>
                    <div>
                        <span>Festivals:</span>
                        <span>{customerView.festivals}</span>
                    </div>
                    <div>
                        <span>General:</span>
                        <span>{customerView.general}</span>
                    </div>
                    <div>
                        <span>Bank:</span>
                        <span>{customerView.bank}</span>
                    </div>
                    <div>
                        <span>Loan Amount:</span>
                        <span>{customerView.loanAmount}</span>
                    </div>
                    <div>
                        <span>Account No:</span>
                        <span>{customerView.bankAccNo}</span>
                    </div>
                    <div>
                        <span>Tenor:</span>
                        <span>{customerView.tenor}</span>
                    </div>
                    <div>
                        <span>EMI:</span>
                        <span>{customerView.emi}</span>
                    </div>
                    <div>
                        <span>EMI Date:</span>
                        <span>{customerView.emiDate ? this.formatDate(customerView.emiDate) : customerView.emiDate}</span>
                    </div>
                    <div>
                        <span>RC:</span>
                        <span>{customerView.rc ? "Yes" : "No"}</span>
                    </div>
                    <div>
                        <span>Insurance:</span>
                        <span>{customerView.insurance ? "Yes" : "No"}</span>
                    </div>
                    {customerView && customerView.type === 1 &&
                        <div>
                            <span>Thank You:</span>
                            <span>{customerView.thankYou ? "Yes" : "No"}</span>
                        </div>
                    }
                </div>
                <div className="col-sm-6 viewcustomer">
                    <div>
                        <span>Office Name:</span>
                        <span>{customerView.officeName}</span>
                    </div>
                    <div>
                        <span>Office Address:</span>
                        <span>{customerView.officeAddress}</span>
                    </div>
                    <div>
                        <span>Office Landline:</span>
                        <span>{customerView.officeLandline}</span>
                    </div>
                    <div>
                        <span>Office Email:</span>
                        <span>{customerView.officeEmail}</span>
                    </div>
                    <div>
                        <span>Car Details:</span>
                        <span>{customerView.carDetails}</span>
                    </div>
                    <div>
                        <span>Any Other Car:</span>
                        <span>{customerView.anyOtherCar ? "Yes" : "No"}</span>
                    </div>
                    <div>
                        <span>Insurance Details:</span>
                        <span>{customerView.insuranceDetails}</span>
                    </div>
                    {customerView && (customerView.type === 1 || customerView.type === 3) ?
                        <div>
                            <div>
                                <span>Service Details:</span>
                                <span>{customerView.serviceDetails}</span>
                            </div>
                            <div>
                                <span>Next Car Purchase & Insurance:</span>
                                <span>{customerView.nextCarDetails}</span>
                            </div> </div> :
                        <div>
                            <div>
                                <span>Seller Name:</span>
                                <span>{customerView.sellerName}</span>
                            </div>
                            <div>
                                <span>Seller Contact:</span>
                                <span>{customerView.sellerContactNumber}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

ViewCustomer.propTypes = {
    customerView: PropTypes.shape({
        id: PropTypes.string,
        acFormat: PropTypes.string,
        acNo: PropTypes.number,
        name: PropTypes.string,
        address: PropTypes.string,
        landlineNumber: PropTypes.string,
        mobileNumber: PropTypes.string,
        emailId: PropTypes.string,
        officeName: PropTypes.string,
        officeAddress: PropTypes.string,
        officeLandline: PropTypes.string,
        officeEmail: PropTypes.string,
        dob: PropTypes.string,
        weddingAnniversary: PropTypes.string,
        festivals: PropTypes.string,
        general: PropTypes.string,
        carDetails: PropTypes.string,
        anyOtherCar: PropTypes.bool,
        insuranceDetails: PropTypes.string,
        sellerName: PropTypes.string,
        sellerContactNumber: PropTypes.string,
        bank: PropTypes.string,
        loanAmount: PropTypes.number,
        bankAccNo: PropTypes.string,
        tenor: PropTypes.string,
        emi: PropTypes.number,
        emiDate: PropTypes.string,
        rc: PropTypes.bool,
        insurance: PropTypes.bool,
        serviceDetails: PropTypes.string,
        nextCarDetails: PropTypes.string,
        thankYou: PropTypes.bool
    })
};
export default ViewCustomer;