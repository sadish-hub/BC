/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const VechicleBasicDetail = ({ addVechicle, vechicleEdit }) => (
    <div>
        <TextInput
            handleChange={(newValue) => addVechicle('make', newValue)}
            title="Make"
            value={vechicleEdit ? vechicleEdit.make : ''}
            id="make"
        />
        <TextInput
            handleChange={(newValue) => addVechicle('model', newValue)}
            title="Model"
            value={vechicleEdit ? vechicleEdit.model : ''}
            id="model"
        />
        <TextInput
            handleChange={(newValue) => addVechicle('variant', newValue)}
            title="Variant"
            value={vechicleEdit ? vechicleEdit.variant : ''}
            id="variant"
        />
    </div>
);

VechicleBasicDetail.propTypes = {
    addVechicle: PropTypes.func.isRequired,
    vechicleEdit: PropTypes.shape({
        make: PropTypes.string,
        model: PropTypes.string,
        variant: PropTypes.string
    })
};
export default VechicleBasicDetail;