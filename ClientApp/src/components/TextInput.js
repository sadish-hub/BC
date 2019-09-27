import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ handleChange, title, value, id, type }) => (
  <div className="form-group">
    <label htmlFor={id}>{title}</label>
    <input type={type || "text"} className="form-control" id={id} value={value || ''} onBlur={(event) => handleChange(event.target.value)} onChange={(event) => handleChange(event.target.value)} />
  </div>
);


TextInput.propTypes = {
  handleChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string
};

TextInput.defaultProps = {
  handleChange: (event) => console.log(`New value : ${event.target.value}`),
  title: '',
  value: null,
  id: '',
  type: null
};

export default TextInput;
