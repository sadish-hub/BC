import React, { Component } from 'react';
import SaveBar from './SaveBar';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import TextAreaInput from './TextAreaInput';
import Search from './Search';
import queryString from 'query-string';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from './constants/LeadType';
import sourcingOptions from './constants/SourcingPoint';
import statusOptions from './constants/EnquiryStatus';
import callStatusOptions from './constants/CallStatus';
import CustomerBasicDetail from './CustomerBasicDetail';
import { Highlighter } from 'react-bootstrap-typeahead';
import filter from 'lodash/filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class Enquiry extends Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.id);
        this.props.setUpEnquiryEditableForm(values.id || null);
    }

    saveRedirectDashboard = () => {
        this.props.saveEnquiryChanges();
        confirmAlert({
            title: 'Confirm to switch',
            message: 'Data saved successfully! Do you want to go to Dashboard?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/enquirydashboard')
                },
                {
                    label: 'No',
                    onClick: () => this.props.discardEnquiryChanges()
                }
            ]
        });
    };

    handleSelectChange = (selectedOption, addEnquiry, property) => {
        if (selectedOption && selectedOption.length > 0) {
            console.log(`Option selected:`, selectedOption);
            addEnquiry(property, selectedOption[0].value);
        }
    };

    handleCustomerBasicSelectChange = ([item]) => {
        if (item) {
            this.props.addEnquiry('customerId', item.id);
            this.props.addEnquiryCustomer('id', item.id);
            this.props.selectItem([item]);
        }
    };

    onCustomerBasicAdd = () => {
        if (this.props.enquiryEdit) {
            delete this.props.enquiryEdit.customerId;
        }
        // else {
        //     this.props.enquiryEdit = {};
        // }
        this.props.addEnquiryCustomer('newCustomer', true);
    };

    renderMenuItemChildren = (option, props, index) => {
        return [
            <Highlighter key="make" search={props.text}>
                {option.make}
            </Highlighter>,
            <div key="model">
                <small>
                    Model: {option.model}
                </small>
            </div>,
            <div key="variant">
                <small>
                    Variant: {option.variant}
                </small>
            </div>,
            <div key="year">
                <small>
                    Year: {option.year}
                </small>
            </div>,
        ];
    }

    render() {
        const {
            addEnquiry,
            addEnquiryCustomer,
            discardEnquiryChanges,
            enquiryView,
            enquiryEdit,
            vechicleItems,
            fetchVechicleItems
        } = this.props;

        let leadType = enquiryEdit && enquiryEdit.leadType ? filter(options, (item) => { if (item.value === enquiryEdit.leadType) return item; }) : options.slice(0, 1);
        let sourcingType = enquiryEdit && enquiryEdit.sourcingPoint ? filter(sourcingOptions, (item) => { if (item.value === enquiryEdit.sourcingPoint) return item; }) : [];
        let enquiryStatus = enquiryEdit && enquiryEdit.status ? filter(statusOptions, (item) => { if (item.value === enquiryEdit.status) return item; }) : [];
        let callStatus = enquiryEdit && enquiryEdit.callStatus ? filter(callStatusOptions, (item) => { if (item.value === enquiryEdit.callStatus) return item; }) : [];

        return (
            <div style={{ width: "90%" }}>
                <h4 className="text-info">Add/Edit Enquiry <FontAwesomeIcon icon={faEdit} /></h4>
                <br></br>

                {
                    enquiryEdit && enquiryEdit.isEdit ?
                        <div> <div className="row">
                            <div className="col-sm-12">Lead Type:</div>
                            <div className="col-sm-2" style={{ fontWeight: "bold" }}>{(leadType && leadType[0].label) || ""}</div>
                        </div> <br></br></div > :
                        <div className="form-group">
                            <label htmlFor="leadType">Lead Type</label>
                            <Typeahead
                                id="leadType"
                                defaultSelected={leadType}
                                labelKey="label"
                                options={options}
                                placeholder="Choose a type..."
                                onChange={value => this.handleSelectChange(value, addEnquiry, "leadType")}
                            />
                        </div>
                }
                <TextInput
                    handleChange={(newValue) => addEnquiry('assignee', newValue)}
                    title="Assignee"
                    value={enquiryEdit ? enquiryEdit.assignee : ''}
                    id="assignee"
                />
                <CustomerBasicDetail addCustomer={addEnquiryCustomer} onCustomerBasicAdd={this.onCustomerBasicAdd} customerEdit={(enquiryEdit && enquiryEdit.customer)|| {}} handleCustomerBasicSelectChange={this.handleCustomerBasicSelectChange} {...this.props} />
                <div className="form-group">
                    <label htmlFor="sourcingType">Sourcing point</label>
                    <Typeahead
                        id="sourcingType"
                        labelKey="label"
                        options={sourcingOptions}
                        placeholder="Choose a Sourcing point..."
                        selected={sourcingType}
                        onChange={value => this.handleSelectChange(value, addEnquiry, "sourcingPoint")}
                    />
                </div>

                {enquiryEdit && enquiryEdit.isEdit &&
                    <div>
                        <div className="row">
                            <div className="col-sm-12">Car Details:</div>
                            <div className="col-sm-4" style={{ fontWeight: "bold" }}>{enquiryEdit.vechicle.make ? `${enquiryEdit.vechicle.make} - ${enquiryEdit.vechicle.model} - ${enquiryEdit.vechicle.variant} - ${enquiryEdit.vechicle.year}` : ""}</div>
                        </div> <br></br></div>
                }
                <Search items={vechicleItems} fetchItems={fetchVechicleItems} title="Car Details"
                    id="vechicleDetail" labelKey={(option) => `${option.make} ${option.model} ${option.variant}`} selectItem={([item]) => addEnquiry("vechicleId", item.id)}
                    placeholder="Search for a Vechicle.." minLength={2} renderMenuItemChildren={this.renderMenuItemChildren} />
                <TextInput
                    handleChange={(newValue) => addEnquiry('exactRequirement', newValue)}
                    title="Exact Requirement"
                    value={enquiryEdit ? enquiryEdit.exactRequirement : ''}
                    id="exactRequirement"
                />
                <TextInput
                    handleChange={(newValue) => addEnquiry('alternateCar', newValue)}
                    title="Alternate Car"
                    value={enquiryEdit ? enquiryEdit.alternateCar : ''}
                    id="alternateCar"
                />
                <TextInput
                    handleChange={(newValue) => addEnquiry('budget', newValue)}
                    title="Budget"
                    value={enquiryEdit ? enquiryEdit.budget : ''}
                    id="budget"
                    type="number"
                />
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <Typeahead
                        id="status"
                        labelKey="label"
                        options={statusOptions}
                        placeholder="Choose a Status..."
                        selected={enquiryStatus}
                        onChange={value => this.handleSelectChange(value, addEnquiry, "status")}
                    />
                </div>
                <div>
                    <CheckBoxInput
                        handleChange={(newValue) => addEnquiry('providedDetails', newValue)}
                        title="Have you provided the details?"
                        value={enquiryEdit ? enquiryEdit.providedDetails || false : false}
                        id="providedDetails"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="callStatus">Call Status</label>
                    <Typeahead
                        id="callStatus"
                        labelKey="label"
                        options={callStatusOptions}
                        placeholder="Choose a Call Status..."
                        selected={callStatus}
                        onChange={value => this.handleSelectChange(value, addEnquiry, "callStatus")}
                    />
                </div>
                <TextInput
                    handleChange={(newValue) => addEnquiry('nextFollowUp', newValue)}
                    title="Next Follow up"
                    value={enquiryEdit ? enquiryEdit.nextFollowUp || '' : ''}
                    id="nextFollowUp"
                    type="date"
                />
                <TextAreaInput
                    handleChange={(newValue) => addEnquiry('comments', newValue)}
                    title="Comments"
                    value={enquiryEdit ? enquiryEdit.comments || '' : ''}
                    id="comments"
                />
                <SaveBar
                    onDiscardAction={discardEnquiryChanges}
                    onSaveAction={this.saveRedirectDashboard}
                />
            </div>
        );
    }
}

export default Enquiry;