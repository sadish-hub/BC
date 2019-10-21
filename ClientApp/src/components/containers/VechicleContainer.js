import { connect } from 'react-redux';
import Vechicle from '../Vechicle';
import { getVechicleView, getVechicleEdit, getVariants } from "../../store/Selectors";
import { setupVechicle, saveVechicle, searchVariants } from '../../store/thunks/VechicleThunk';
import { addVechicle } from '../../store/actions/VechicleActions';

const mapStateToProps = state => ({
    vechicleView: getVechicleView(state),
    vechicleEdit: getVechicleEdit(state),
    vechicleItems: getVariants(state)
});

const mapDispatchToProps = dispatch => ({
    addVechicle: (fieldName, fieldValue) => dispatch(addVechicle(fieldName, fieldValue)),
    discardVechicleChanges: () => dispatch(setupVechicle()),
    saveVechicleChanges: () => dispatch(saveVechicle()),
    setUpVechicleEditableForm: (id = null) => dispatch(setupVechicle(id)),
    fetchVechicleItems: value => dispatch(searchVariants(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Vechicle);
