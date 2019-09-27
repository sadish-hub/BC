import { connect } from 'react-redux';
import Vechicle from '../Vechicle';
import { getVechicleView, getVechicleEdit } from "../../store/Selectors";
import { setupVechicle, saveVechicle } from '../../store/thunks/VechicleThunk';
import { addVechicle } from '../../store/actions/VechicleActions';

const mapStateToProps = state => ({
    vechicleView: getVechicleView(state),
    vechicleEdit: getVechicleEdit(state)
});

const mapDispatchToProps = dispatch => ({
    addVechicle: (fieldName, fieldValue) => dispatch(addVechicle(fieldName, fieldValue)),
    discardVechicleChanges: () => dispatch(setupVechicle()),
    saveVechicleChanges: () => dispatch(saveVechicle()),
    setUpVechicleEditableForm: () => dispatch(setupVechicle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vechicle);
