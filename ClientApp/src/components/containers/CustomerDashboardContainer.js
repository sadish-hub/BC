import {
    connect
} from 'react-redux';
import CustomerDashboard from '../CustomerDashboard';
import {
    getCustomerDashboardData, getCustomerMessageData
} from "../../store/Selectors";
import {
    getCustomerDashboard, SendCustomerMessage
} from '../../store/thunks/CustomerThunk';
import { addCustomerMessage } from '../../store/actions/CustomerActions';

const mapStateToProps = state => ({
    customerDashboardItems: getCustomerDashboardData(state),
    customerMessage: getCustomerMessageData(state)
});

const mapDispatchToProps = dispatch => ({
    addMessage: (fieldName, fieldValue) => dispatch(addCustomerMessage(fieldName, fieldValue)),
    setUpCustomerDashboardForm: () => dispatch(getCustomerDashboard()),
    sendMessage: () => dispatch(SendCustomerMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
