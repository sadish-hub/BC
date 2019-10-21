import { connect } from 'react-redux';
import Variant from '../Variant';
import { getVariantEdit } from "../../store/Selectors";
import { setupVariant, saveVariant } from '../../store/thunks/VariantThunk';
import { addVariant } from '../../store/actions/VariantActions';

const mapStateToProps = state => ({
    variantEdit: getVariantEdit(state)
});

const mapDispatchToProps = dispatch => ({
    addVariant: (fieldName, fieldValue) => dispatch(addVariant(fieldName, fieldValue)),
    discardVariantChanges: () => dispatch(getVariantEdit()),
    saveVariantChanges: () => dispatch(saveVariant()),
    setUpVariantEditableForm: (id = null) => dispatch(setupVariant(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Variant);
