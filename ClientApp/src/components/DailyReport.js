import React, { Component } from 'react';
import SaveBar from './SaveBar';
import TextInput from './TextInput';
import CheckBoxInput from './CheckBoxInput';
import queryString from 'query-string';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from './constants/InfoVia';
import filter from 'lodash/filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

class DailyReport extends Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.id);
        this.props.setUpDailyReportEditableForm(values.id || null);
    }

    handleSelectChange = (selectedOption, addDailyReport, property) => {
        if (selectedOption && selectedOption.length > 0) {
            addDailyReport(property, selectedOption[0].value);
        }
    };

    saveRedirectDashboard = () => {
        this.props.saveDailyReportChanges();
        confirmAlert({
            title: 'Confirm to switch',
            message: 'Data saved successfully! Do you want to go to Dashboard?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.history.push('/dailyreportdashboard')
                },
                {
                    label: 'No',
                    onClick: () => this.props.discardDailyReportChanges()
                }
            ]
        });
    };

    render() {
        const {
            addDailyReport,
            discardDailyReportChanges,
            dailyReportEdit
        } = this.props;

        let infoVia = dailyReportEdit && dailyReportEdit.infoVia ? filter(options, (item) => { if (item.value === dailyReportEdit.infoVia) return item; }) : [];

        return (
            <div style={{ width: "90%" }}>
                <h4 className="text-info">Add/Edit Daily Status Report <FontAwesomeIcon icon={faReceipt} /></h4>
                <br></br>
                <TextInput
                    handleChange={(newValue) => addDailyReport('webStatus', newValue)}
                    title="Web Status"
                    value={dailyReportEdit ? dailyReportEdit.webStatus : ''}
                    id="webStatus"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('totalNoOfCar', newValue)}
                    title="Total no. of cars displayed"
                    value={dailyReportEdit ? dailyReportEdit.totalNoOfCar : ''}
                    id="totalNoOfCar"
                    type="number"
                />
                <CheckBoxInput
                    handleChange={(newValue) => addDailyReport('withPhotos', newValue)}
                    title="With photos?"
                    value={dailyReportEdit ? dailyReportEdit.withPhotos || false : false}
                    id="withPhotos"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('moreThan30Days', newValue)}
                    title="More than 30 days"
                    value={dailyReportEdit ? dailyReportEdit.moreThan30Days : ''}
                    id="moreThan30Days"
                />
                <div className="form-group">
                    <label htmlFor="infoVia">Type</label>
                    <Typeahead
                        id="infoVia"
                        selected={infoVia}
                        labelKey="label"
                        options={options}
                        placeholder="Choose a type..."
                        onChange={value => this.handleSelectChange(value, addDailyReport, "infoVia")}
                    />
                </div>
                <TextInput
                    handleChange={(newValue) => addDailyReport('freshCall', newValue)}
                    title="Fresh calls today"
                    value={dailyReportEdit ? dailyReportEdit.freshCall : ''}
                    id="freshCall"
                    type="number"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('oldCall', newValue)}
                    title="Old Calls"
                    value={dailyReportEdit ? dailyReportEdit.oldCall : ''}
                    id="oldCall"
                    type="number"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('dealerCall', newValue)}
                    title="Dealer Calls"
                    value={dailyReportEdit ? dailyReportEdit.dealerCall : ''}
                    id="dealerCall"
                    type="number"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('totalCall', newValue)}
                    title="Total Calls"
                    value={dailyReportEdit ? dailyReportEdit.totalCall : ''}
                    id="totalCall"
                    type="number"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('noOfAppointment', newValue)}
                    title="No. of appointment"
                    value={dailyReportEdit ? dailyReportEdit.noOfAppointment : ''}
                    id="noOfAppointment"
                    type="number"
                /><TextInput
                    handleChange={(newValue) => addDailyReport('noOfAdvanceRecd', newValue)}
                    title="No. of advance received"
                    value={dailyReportEdit ? dailyReportEdit.noOfAdvanceRecd : ''}
                    id="noOfAdvanceRecd"
                    type="number"
                />
                <TextInput
                    handleChange={(newValue) => addDailyReport('noOfCarsSold', newValue)}
                    title="No of cars sold"
                    value={dailyReportEdit ? dailyReportEdit.noOfCarsSold : ''}
                    id="noOfCarsSold"
                    type="number"
                />
                <SaveBar
                    onDiscardAction={discardDailyReportChanges}
                    onSaveAction={this.saveRedirectDashboard}
                />
            </div>
        );
    }
}

export default DailyReport;