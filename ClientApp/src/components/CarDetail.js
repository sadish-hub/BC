import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import Search from './Search';
import { Highlighter } from 'react-bootstrap-typeahead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import filter from 'lodash/filter';

const CarDetail = ({ addVechicle, vechicleEdit, vechicleItems, fetchVechicleItems }) => {
    let selectedVariant = [];
    if (vechicleEdit && vechicleEdit.vechicleVariant) {
        //let sel = filter(vechicleItems.detail, (item) => { if (item.id === vechicleEdit.vechicleVariantId) return item; })[0];
        selectedVariant.push(vechicleEdit.vechicleVariant);
    }
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
            </div>
        ];
    }

    const handleSelectChange = ([item]) => {
        if (item) {
            console.log(`Vechicle Option selected:`, item);
            addVechicle('vechicleVariantId', item.id);
        }
    };

    return (
        <div>
            <Search items={vechicleItems} fetchItems={fetchVechicleItems} title="Car Details"
                id="vechicleDetail" labelKey={(option) => `${option.make} ${option.model} ${option.variant}`} selectItem={handleSelectChange}
                placeholder="Search for a Vechicle.." minLength={2} renderMenuItemChildren={renderMenuItemChildren} selected={selectedVariant} />
            <TextInput
                handleChange={(newValue) => addVechicle('vechicleNumber', newValue)}
                title="Vechicle Number"
                value={vechicleEdit ? vechicleEdit.vechicleNumber : ''}
                id="vechicleNumber"
            />
            <TextInput
                handleChange={(newValue) => addVechicle('year', newValue)}
                title="Year"
                value={vechicleEdit ? vechicleEdit.year : ''}
                id="year"
                type="number"
            />
            <TextInput
                handleChange={(newValue) => addVechicle('kilometer', newValue)}
                title="Kilometer"
                value={vechicleEdit ? vechicleEdit.kilometer : ''}
                id="kilometer"
            />
            <TextInput
                handleChange={(newValue) => addVechicle('registration', newValue)}
                title="Place of Registration"
                value={vechicleEdit ? vechicleEdit.registration : ''}
                id="registration"
            />
            <TextInput
                handleChange={(newValue) => addVechicle('budget', newValue)}
                title="Price"
                value={vechicleEdit ? vechicleEdit.budget : ''}
                id="budget"
                type="number"
            />
            <div className="card" style={{ marginBottom: "10px" }}>
                <div className="card-body">
                    <h5 className="text-info">Transfer Status <FontAwesomeIcon icon={faBook} /></h5>
                    <CheckBoxInput
                        handleChange={(newValue) => addVechicle('rc', newValue)}
                        title="RC"
                        value={vechicleEdit ? (vechicleEdit.rc || false) : false}
                        id="rc"
                    />
                    <CheckBoxInput
                        handleChange={(newValue) => addVechicle('insurance', newValue)}
                        title="Insurance"
                        value={vechicleEdit ? (vechicleEdit.insurance || false) : false}
                        id="insurance"
                    />
                </div>
            </div>
        </div>
    );
}

// CarDetail.propTypes = {
//     addCustomer: PropTypes.func.isRequired,
//     addCustomerVechicle: PropTypes.func.isRequired,
//     customerEdit: PropTypes.shape({
//     })
// };

export default CarDetail;