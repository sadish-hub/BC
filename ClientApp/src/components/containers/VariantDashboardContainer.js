import {
    connect
} from 'react-redux';
import VariantDashboard from '../VariantDashboard';
import {
    getVariantDashboardData
} from "../../store/Selectors";
import {
    getVariantDashboard
} from '../../store/thunks/VariantThunk';

const mapStateToProps = state => ({
    variantDashboardItems: getVariantDashboardData(state)
});

const mapDispatchToProps = dispatch => ({
    setUpVariantDashboardForm: () => dispatch(getVariantDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(VariantDashboard);
