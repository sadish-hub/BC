import {
    connect
} from 'react-redux';
import VechicleDashboard from '../VechicleDashboard';
import {
    getVechicleDashboardData
} from "../../store/Selectors";
import {
    getVechicleDashboard
} from '../../store/thunks/VechicleThunk';

const mapStateToProps = state => ({
    vechicleDashboardItems: getVechicleDashboardData(state)
});

const mapDispatchToProps = dispatch => ({
    setUpVechicleDashboardForm: () => dispatch(getVechicleDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(VechicleDashboard);
