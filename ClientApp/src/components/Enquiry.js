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
import { AgGridReact } from 'ag-grid-react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCar } from '@fortawesome/free-solid-svg-icons';

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

    onSearchAction = () => this.props.mapVechicles();

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

    handleSearchChange = (item) => {
        if(item){
            this.props.addEnquiry('vechicleVariant', item);
            var ids = item.map(j => j.id).join(",");
            this.props.addEnquirySearch('selectedVariantIds', ids);
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
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
            </div>
        ];
    }

    render() {
        const {
            addEnquiry,
            addEnquiryCustomer,
            discardEnquiryChanges,
            addEnquirySearch,
            enquiryEdit,
            vechicleItems,
            fetchVechicleItems
        } = this.props;

        let leadType = enquiryEdit && enquiryEdit.leadType ? filter(options, (item) => { if (item.value === enquiryEdit.leadType) return item; }) : options.slice(0, 1);
        let sourcingType = enquiryEdit && enquiryEdit.sourcingPoint ? filter(sourcingOptions, (item) => { if (item.value === enquiryEdit.sourcingPoint) return item; }) : [];
        let enquiryStatus = enquiryEdit && enquiryEdit.status ? filter(statusOptions, (item) => { if (item.value === enquiryEdit.status) return item; }) : [];
        let callStatus = enquiryEdit && enquiryEdit.callStatus ? filter(callStatusOptions, (item) => { if (item.value === enquiryEdit.callStatus) return item; }) : [];
        let selectedVechicle = enquiryEdit && enquiryEdit.vechicleVariant ? enquiryEdit.vechicleVariant : [];

        let columnDefs = [{
            headerName: "Vechicle Number", field: "vechicleNumber", checkboxSelection: true, sortable: true, filter: true, resizable: true, width: 300
        },
        {
            headerName: "Inventory", field: "inventory", sortable: true, filter: true, resizable: true, width: 200
        },
        {
            headerName: "Variant", field: "vechicleVariantDetail", sortable: true, filter: true, resizable: true, width: 300
        }
        ];

        let vechicleListItems = enquiryEdit && enquiryEdit.mapVechicles || [];
        
        // [{"vechicleNumber" : "Test", "inventory":"testinv","vechicleVariantDetail" : "Maruti"},
        // {"vechicleNumber" : "Rest", "inventory":"restinv","vechicleVariantDetail" : "Maruti"},];

        return (
            <div style={{ width: "90%" }}>
                <h4 className="text-info">Add/Edit Enquiry <FontAwesomeIcon icon={faSearch} /></h4>
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
                <CustomerBasicDetail addCustomer={addEnquiryCustomer} onCustomerBasicAdd={this.onCustomerBasicAdd} customerEdit={(enquiryEdit && enquiryEdit.customer) || {}} handleCustomerBasicSelectChange={this.handleCustomerBasicSelectChange} {...this.props} />
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


                <div className="card" style={{ marginBottom: "10px" }}>
                    <div className="card-body">
                        <h5 className="text-info">Search Vechicle <FontAwesomeIcon icon={faCar} /></h5>

                        <Search items={vechicleItems} multiple={true} fetchItems={fetchVechicleItems} title="Car Details"
                            id="vechicleDetail" labelKey={(option) => `${option.make} ${option.model} ${option.variant}`} selectItem={(selected) => {console.log(selected);this.handleSearchChange(selected, addEnquiry)}} /*selectItem={([item]) => console.log([item])addEnquiry("vechicleId", item.id)}*/
                            placeholder="Search for a Vechicle.." selected={selectedVechicle} minLength={2} renderMenuItemChildren={this.renderMenuItemChildren} />

                        <TextInput
                            handleChange={(newValue) => addEnquirySearch('year', newValue)}
                            title="Year"
                            value={enquiryEdit ? enquiryEdit.year : ''}
                            id="year"
                            type="number"
                        />
                        <TextInput
                            handleChange={(newValue) => addEnquirySearch('kilometer', newValue)}
                            title="Kilometer"
                            value={enquiryEdit ? enquiryEdit.kilometer : ''}
                            id="kilometer"
                            type="number"
                        />
                        <TextInput
                            handleChange={(newValue) => addEnquirySearch('registration', newValue)}
                            title="Registration"
                            value={enquiryEdit ? enquiryEdit.registration : ''}
                            id="registration"
                            type="number"
                        />
                        <TextInput
                            handleChange={(newValue) => addEnquirySearch('budget', newValue)}
                            title="Budget"
                            value={enquiryEdit ? enquiryEdit.budget : ''}
                            id="budget"
                            type="number"
                        />
                        <div className="form-group SaveBar">
                            <button onClick={this.onSearchAction} className="btn btn-info">Search</button>
                        </div>
                        <div>
                            <h5 className="text-info">Available Vechicle </h5>

                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ overflow: "hidden", flexGrow: "1" }}>
                                    <div
                                        id="myGrid"
                                        style={{
                                            height: "200px",
                                            width: "80%"
                                        }}
                                        className="ag-theme-blue">
                                        <AgGridReact
                                            onGridReady={this.onGridReady}
                                            rowSelection="single"
                                            columnDefs={columnDefs}
                                            rowData={vechicleListItems || []}>
                                        </AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TextInput
                    handleChange={(newValue) => addEnquiry('exactRequirement', newValue)}
                    title="Exact Requirement"
                    value={enquiryEdit ? enquiryEdit.exactRequirement : ''}
                    id="exactRequirement"
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
                    onFinalizeAction={this.saveRedirectDashboard}
                />
            </div>
        );
    }
}

export default Enquiry;