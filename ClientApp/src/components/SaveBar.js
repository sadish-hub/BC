import React from 'react';
import PropTypes from 'prop-types';

import './SaveBar.css';

const SaveBar = ({
  onDiscardAction,
  onSaveAction,
  onFinalizeAction
}) => (
    <div className="form-group SaveBar">
      <button onClick={onDiscardAction} className="btn btn-warning">Discard</button>
      <button onClick={onSaveAction} className="btn btn-success">Save</button>
      {onFinalizeAction && <button onClick={onFinalizeAction} className="btn btn-primary">Finalize</button>}
    </div>
  );

SaveBar.propTypes = {
  onDiscardAction: PropTypes.func,
  onSaveAction: PropTypes.func,
};

SaveBar.defaultProps = {
  onDiscardAction: () => console.info('Discard'),
  onSaveAction: () => console.info('Save'),
};

export default SaveBar;
