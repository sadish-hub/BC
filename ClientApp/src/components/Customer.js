/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import CheckBoxInput from './CheckBoxInput';
import SaveBar from './SaveBar';
import CustomerBasicDetail from './CustomerBasicDetail';
import BankDetail from './BankDetail';
import ViewCustomer from './ViewCustomer';
import OfficeDetail from './OfficeDetail';
import CustomerMiscDetail from './CustomerMiscDetail';
import TextInput from './TextInput';
import { confirmAlert } from 'react-confirm-alert';
import filter from 'lodash/filter';
import options from './constants/CustomerType';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Customer extends Component {

    componentDidMount() {
        if (!(this.props.customerEdit && this.props.customerEdit.isEdit)) {
            this.props.addCustomerVechicle('type', filter(options, (item) => { if (item.value === '0') return item; })[0]);
        }
        const values = queryString.parse(this.props.location.search);
        console.log(values.id);
        this.props.setUpCustomerEditableForm(values.id || null);
    }

    handleSelectChange = (selectedOption, addCustomer, discardCustomerChanges, property) => {
        if (selectedOption && selectedOption.length > 0) {
            console.log(`Option selected:`, selectedOption);
            discardCustomerChanges();
            addCustomer(property, selectedOption[0].value);
        }
    };
    handleVechicleNumberChange = (selectedOption, addCustomer, property) => {
        if (selectedOption && selectedOption.length > 0) {
            addCustomer(property, selectedOption[0].id);
        }
    };
    handleVechicleChange = (selectedOption, addCustomer, discardCustomerChanges, customer) => {
        if (selectedOption && selectedOption.length > 0) {
            console.log(`Option selected:`, selectedOption);
            discardCustomerChanges();
            addCustomer("selectedVechicleNumber", selectedOption[0].value);
            this.props.getSelectedCustomerById(customer);
        }
    };

    saveRedirectDashboard = () => {
        this.props.saveCustomerChanges();
        confirmAlert({
            title: 'Confirm to switch',
            message: 'Data saved successfully! Do you want to go to Dashboard?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/customerdashboard')
                },
                {
                    label: 'No',
                    onClick: () => this.props.discardCustomerChanges()
                }
            ]
        });
    };

    handleCustomerBasicSelectChange = ([item]) => {
        if (item) {
            this.props.addCustomer('id', item.id);
            this.props.addCustomerVechicle('customerId', item.id);
            this.props.selectItem([item]);
        }
    };

    onCustomerBasicAdd = () => {
        if (this.props.customerEdit) {
            delete this.props.customerEdit.id;
        }
        this.props.addCustomer('newCustomer', true);
    };

    render() {
        const {
            addCustomer,
            addCustomerVechicle,
            discardCustomerChanges,
            customerView,
            customerEdit,
            hasCustomerChanged,
            vechicleItems,
            fetchVechicleItems
        } = this.props;

        let customerVechicleEdit = customerEdit && customerEdit.customerVechicles ?
            filter(customerEdit.customerVechicles, (item) => { if (item.vechicleId === (customerEdit.selectedVechicleNumber || item.vechicleId)) return item; })[0] : {};
        let cusType = customerVechicleEdit && customerVechicleEdit.Type ? filter(options, (item) => { if (item.value === customerVechicleEdit.type) return item; })[0] : options.slice(0, 1);
        let custVechicles = customerEdit && customerEdit.vechicles ? customerEdit.vechicles : [];
        let vechicles = custVechicles.map(o => ({
            label: o.vechicleNumber,
            value: o.id
        }));

        let cusSelectedVechicleNumber = customerVechicleEdit && customerVechicleEdit.id ? filter(vechicles, (item) => { if (item.value === customerVechicleEdit.vechicleId) return item; }) : vechicles.slice(0, 1);

        return (

            customerView ? <ViewCustomer {...this.props} />
                :
                <div style={{ width: "90%" }}>
                    <h4 className="text-info">Add/Edit Customer <FontAwesomeIcon icon={faUserEdit} /></h4>
                    <br></br>

                    {customerEdit && customerEdit.isEdit ?
                        <div>
                            <div className="form-group">
                                <label htmlFor="vechicleNo">Vechicle Numbers</label>
                                <Typeahead
                                    id="vechicleNo"
                                    defaultSelected={cusSelectedVechicleNumber}
                                    labelKey="label"
                                    options={vechicles || [{ "label": "test", "value": 0 }]}
                                    placeholder="Choose a vechicle number..."
                                    onChange={value => this.handleVechicleChange(value, addCustomer, discardCustomerChanges, customerEdit)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-sm-12">Type:</div>
                                <div className="col-sm-2" style={{ fontWeight: "bold" }}>{(cusType && cusType[0].label) || ""}</div>
                            </div><br></br>
                        </div> :
                        <div>
                            <div className="form-group">  <Search items={vechicleItems} fetchItems={fetchVechicleItems} title="Vehicle Number"
                                id="vechicleDetail" labelKey={(option) => `${option.vechicleNumber}`} selectItem={value => this.handleVechicleNumberChange(value, addCustomerVechicle, "vechicleId")}
                                placeholder="Search for a Vechicle Number.." minLength={2} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerType">Type</label>
                                <Typeahead
                                    id="customerType"
                                    defaultSelected={cusType}
                                    labelKey="label"
                                    options={options}
                                    placeholder="Choose a type..."
                                    onChange={value => this.handleSelectChange(value, addCustomerVechicle, discardCustomerChanges, "type")}
                                />
                            </div>
                        </div>
                    }
                    <CustomerBasicDetail {...this.props} onCustomerBasicAdd={this.onCustomerBasicAdd} handleCustomerBasicSelectChange={this.handleCustomerBasicSelectChange} />
                    <OfficeDetail {...this.props} />
                    <CustomerMiscDetail {...this.props} />
                    <CheckBoxInput
                        handleChange={(newValue) => addCustomer('anyOtherCar', newValue)}
                        title="Any other car?"
                        value={customerEdit ? customerEdit.anyOtherCar || false : false}
                        id="anyOtherCar"
                    />
                    <TextInput
                        handleChange={(newValue) => addCustomer('insuranceDetails', newValue)}
                        title="Insurance Details"
                        value={customerEdit ? customerEdit.insuranceDetails || '' : ''}
                        id="insuranceDetails"
                    />
                    {customerEdit && (customerEdit.type === 1 || customerEdit.type === 3) ?
                        <div>
                            <TextInput
                                handleChange={(newValue) => addCustomer('serviceDetails', newValue)}
                                title="Service details"
                                value={customerEdit ? customerEdit.serviceDetails : ''}
                                id="serviceDetails"
                            />
                            <TextInput
                                handleChange={(newValue) => addCustomer('nextCarDetails', newValue)}
                                title="Next car purchase & insurance"
                                value={customerEdit ? customerEdit.nextCarDetails : ''}
                                id="nextCarDetails"
                            /></div>
                        :
                        <div style={{ marginBottom: "10px" }}>
                            <div className="card">
                                <div className="card-body">
                                    <BankDetail {...this.props} />
                                </div>
                            </div>
                        </div>
                    }
                    {customerEdit && customerEdit.type === 1 &&
                        <div style={{ marginBottom: "10px" }}>
                            <CheckBoxInput
                                handleChange={(newValue) => addCustomer('thankYou', newValue)}
                                title="Thank You letter"
                                value={customerEdit ? customerEdit.thankYou || false : false}
                                id="thankYou"
                            />
                        </div>
                    }
                    <SaveBar
                        onDiscardAction={discardCustomerChanges}
                        open={hasCustomerChanged || false}
                        onSaveAction={this.saveRedirectDashboard}
                    />
                </div>
        );
    }
}

Customer.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    discardCustomerChanges: PropTypes.func.isRequired,
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
    }),
    customerEdit: PropTypes.shape({
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
        loanAmount: PropTypes.string,
        bankAccNo: PropTypes.string,
        tenor: PropTypes.string,
        emi: PropTypes.string,
        emiDate: PropTypes.string,
        rc: PropTypes.bool,
        insurance: PropTypes.bool,
        serviceDetails: PropTypes.string,
        nextCarDetails: PropTypes.string,
        thankYou: PropTypes.bool
    }),
    hasCustomerChanged: PropTypes.bool,
    saveCustomerChanges: PropTypes.func.isRequired,
    setUpCustomerEditableForm: PropTypes.func.isRequired,
};

Customer.defaultProps = {
    customerView: null,
    customerEdit: null,
    hasCustomerChanged: true,
};

export default Customer;
