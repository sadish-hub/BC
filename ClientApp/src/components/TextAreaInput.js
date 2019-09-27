import React from 'react';
import PropTypes from 'prop-types';

const TextAreaInput = ({ handleChange, title, value, id }) => {
    let purgedValue = (value && value.replace('\\n', '\n')) || '';
    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <textarea className="form-control" rows="3" value={purgedValue} id={id} onChange={(event) => handleChange(event.target.value)}></textarea>
        </div>
    )
};


TextAreaInput.propTypes = {
    handleChange: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
    id: PropTypes.string
};

TextAreaInput.defaultProps = {
    handleChange: (event) => console.log(`New value : ${event.target.value}`),
    title: '',
    value: '',
    id: ''
};

export default TextAreaInput;
