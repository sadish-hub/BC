import { connect } from 'react-redux';
import DailyReport from '../DailyReport';
import { getDailyReportEdit } from "../../store/Selectors";
import { setupDailyReport, saveDailyReport } from '../../store/thunks/DailyReportThunk';
import { addDailyReport } from '../../store/actions/DailyReportActions';

const mapStateToProps = state => ({
    dailyReportEdit: getDailyReportEdit(state)
});

const mapDispatchToProps = dispatch => ({
    addDailyReport: (fieldName, fieldValue) => dispatch(addDailyReport(fieldName, fieldValue)),
    discardDailyReportChanges: () => dispatch(getDailyReportEdit()),
    saveDailyReportChanges: () => dispatch(saveDailyReport()),
    setUpDailyReportEditableForm: (id = null) => dispatch(setupDailyReport(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyReport);
