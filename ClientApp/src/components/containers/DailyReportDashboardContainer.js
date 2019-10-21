import {
    connect
} from 'react-redux';
import DailyReportDashboard from '../DailyReportDashboard';
import {
    getDailyReportDashboardData
} from "../../store/Selectors";
import {
    getDailyReportDashboard
} from '../../store/thunks/DailyReportThunk';

const mapStateToProps = state => ({
    dailyReportDashboardItems: getDailyReportDashboardData(state)
});

const mapDispatchToProps = dispatch => ({
    setUpDailyReportDashboardForm: () => dispatch(getDailyReportDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportDashboard);
