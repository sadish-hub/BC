import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxInput = ({ handleChange, title, value, id }) => (
    <div className="custom-control custom-checkbox mb-3 checkbox-inline">
        <input type="checkbox" className="custom-control-input" id={id} checked={value} onChange={(event) => handleChange(event.target.checked)} />
        <label className="custom-control-label" htmlFor={id}>{title}</label>
    </div>
);

CheckBoxInput.propTypes = {
    handleChange: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.bool,
    id: PropTypes.string
};

CheckBoxInput.defaultProps = {
    handleChange: (event) => console.log(`New value : ${event.target.checked}`),
    title: '',
    value: false,
    id: ''
};

export default CheckBoxInput;
