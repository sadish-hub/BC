import {
    connect
} from 'react-redux';
import EnquiryDashboard from '../EnquiryDashboard';
import {
    getEnquiryDashboardData
} from "../../store/Selectors";
import {
    getEnquiryDashboard
} from '../../store/thunks/EnquiryThunk';

const mapStateToProps = state => ({
    enquiryDashboardItems: getEnquiryDashboardData(state)
});

const mapDispatchToProps = dispatch => ({
    setUpEnquiryDashboardForm: () => dispatch(getEnquiryDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryDashboard);
