import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import Search from './Search';
import { Highlighter } from 'react-bootstrap-typeahead';
import filter from 'lodash/filter';

const CarDetail = ({ addCustomer, customerEdit, vechicleItems, fetchVechicleItems, addCustomerVechicle }) => {

    let customerVechicleEdit = customerEdit && customerEdit.customerVechicles ? filter(customerEdit.customerVechicles, (item) => { if (item.id === (customerEdit.selectedVechicleNumber || item.id)) return item; })[0] : {};
    let vechicleDetails = customerVechicleEdit.vechicleId ? filter(customerEdit.vechicles, (item) => { if (item.id === customerVechicleEdit.vechicleId) return item; })[0] : {};
    const renderMenuItemChildren = (option, props, index) => {
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

    const handleSelectChange = ([item]) => {
        if (item) {
            console.log(`Vechicle Option selected:`, item);
            addCustomerVechicle('vechicleId', item.id);
        }
    };

    return (
        <div>
            {customerEdit && customerEdit.isEdit &&
                <div>
                    <div className="row">
                        <div className="col-sm-12">Car Details:</div>
                        <div className="col-sm-4" style={{ fontWeight: "bold" }}>{vechicleDetails.make ? `${vechicleDetails.make} - ${vechicleDetails.model} - ${vechicleDetails.variant} - ${vechicleDetails.year}` : ""}</div>
                    </div> <br></br></div>
            }
            <Search items={vechicleItems} fetchItems={fetchVechicleItems} title="Car Details"
                id="vechicleDetail" labelKey={(option) => `${option.make} ${option.model} ${option.variant}`} selectItem={handleSelectChange}
                placeholder="Search for a Vechicle.." minLength={2} renderMenuItemChildren={renderMenuItemChildren} selected={(customerEdit && customerEdit.selectedVechicle) || null} />
            <TextInput
                handleChange={(newValue) => addCustomerVechicle('vechicleNumber', newValue)}
                title="Vechicle Number"
                value={customerVechicleEdit.vechicleNumber || ''}
                id="vechicleNumber"
            />
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
        </div>
    );
}

CarDetail.propTypes = {
    addCustomer: PropTypes.func.isRequired,
    addCustomerVechicle: PropTypes.func.isRequired,
    customerEdit: PropTypes.shape({
        anyOtherCar: PropTypes.bool,
        insuranceDetails: PropTypes.string
    })
};

export default CarDetail;