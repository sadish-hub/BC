/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import SaveBar from './SaveBar';
import TextInput from './TextInput';
import CarDetail from './CarDetail';
import ViewVechicle from './ViewVechicle';
import statusOptions from './constants/VechicleStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import filter from 'lodash/filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class Vechicle extends Component {
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.id);
        this.props.setUpVechicleEditableForm(values.id || null);
    }

    handleStatusChange = (selectedOption, addVechicle, property) => {
        if (selectedOption && selectedOption.length > 0) {
            addVechicle(property, selectedOption[0].value);
        }
    };

    saveRedirectDashboard = () => {
        this.props.saveVechicleChanges();
        confirmAlert({
            title: 'Confirm to switch',
            message: 'Data saved successfully! Do you want to go to Dashboard?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/vechicledashboard')
                },
                {
                    label: 'No',
                    onClick: () => this.props.discardVechicleChanges()
                }
            ]
        });
    };

    render() {
        const {
            addVechicle,
            discardVechicleChanges,
            vechicleView,
            vechicleEdit
        } = this.props;

        let vechStatus = vechicleEdit && vechicleEdit.status >= 0 ? filter(statusOptions, (item) => { if (item.value === vechicleEdit.status) return item; }) : [];

        return (
            vechicleView ? <ViewVechicle {...this.props} /> :
                <div style={{ width: "90%" }}>
                    <h4 className="text-info">Add/Edit Vechicle <FontAwesomeIcon icon={faCar} /></h4>

                    <CarDetail {...this.props} />

                    <TextInput
                        handleChange={(newValue) => addVechicle('sellerName', newValue)}
                        title="Seller name"
                        value={vechicleEdit ? vechicleEdit.sellerName : ''}
                        id="sellerName"
                    />
                    <TextInput
                        handleChange={(newValue) => addVechicle('sellerContactNumber', newValue)}
                        title="Seller contact no."
                        value={vechicleEdit ? vechicleEdit.sellerContactNumber : ''}
                        id="sellerContactNumber"
                        type="number"
                    />
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <Typeahead
                            id="status"
                            labelKey="label"
                            options={statusOptions}
                            placeholder="Choose a Status..."
                            selected={vechStatus}
                            onChange={value => this.handleStatusChange(value, addVechicle, "status")}
                        />
                    </div>
                    <SaveBar
                        onDiscardAction={discardVechicleChanges}
                        onSaveAction={this.saveRedirectDashboard}
                    />
                </div>
        );
    }
}

Vechicle.propTypes = {
    addVechicle: PropTypes.func.isRequired,
    discardVechicleChanges: PropTypes.func.isRequired,
    // vechicleView: PropTypes.shape({
    //     id: PropTypes.string,
    //     make: PropTypes.string,
    //     model: PropTypes.string,
    //     variant: PropTypes.string,
    //     vechicleNumber: PropTypes.string,
    //     year: PropTypes.number,
    //     price: PropTypes.number,
    //     offer: PropTypes.string,
    //     city: PropTypes.string,
    //     exShowRoomPrice: PropTypes.number,
    //     onRoadPrice: PropTypes.number,
    //     currentPrice: PropTypes.number
    // }),
    // vechicleEdit: PropTypes.shape({
    //     id: PropTypes.string,
    //     make: PropTypes.string,
    //     model: PropTypes.string,
    //     variant: PropTypes.string,
    //     vechicleNumber: PropTypes.string,
    //     year: PropTypes.string,
    //     price: PropTypes.string,
    //     offer: PropTypes.string,
    //     city: PropTypes.string,
    //     exShowRoomPrice: PropTypes.string,
    //     onRoadPrice: PropTypes.string,
    //     currentPrice: PropTypes.string
    // }),
    saveVechicleChanges: PropTypes.func.isRequired,
    setUpVechicleEditableForm: PropTypes.func.isRequired,
};

Vechicle.defaultProps = {
    vechicleView: null,
    vechicleEdit: null
};

export default Vechicle;