import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faReceipt } from '@fortawesome/free-solid-svg-icons'

class DailyReportDashboard extends Component {
    componentDidMount() {
        this.props.setUpDailyReportDashboardForm();
    }
    onRedirectDailyReport = e => {
        this.props.history.push('/dailyreport');
    };
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    render() {
        const { dailyReportDashboardItems } = this.props;

        const loadEdit = id => {
            this.props.history.push({
                pathname: '/dailyreport',
                search: `?id=${id}`
            });
        }

        let columnDefs = [
            {
                headerName: "Executive", field: "executive", sortable: true, filter: true, resizable: true, width: 200, tooltipField: "executive"
            },
            {
                headerName: "Web Status", field: "webStatus", sortable: true, filter: true, resizable: true, width: 200, tooltipField: "webStatus"
            },
            {
                headerName: "Total no. of car", field: "totalNoOfCar", sortable: true, filter: true, resizable: true, width: 200
            },
            {
                headerName: "More than 30 days", field: "moreThan30Days", sortable: true, filter: true, resizable: true, width: 150
            },
            {
                headerName: "Info Via", field: "infoVia", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "infoVia"
            },
            {
                headerName: "Total calls", field: "totalCall", sortable: true, filter: true, resizable: true, width: 150
            },
            {
                headerName: "No. of appointment", field: "noOfAppointment", sortable: true, filter: true, resizable: true, width: 150
            },
            {
                headerName: "No. of advance recd", field: "noOfAdvanceRecd", sortable: true, filter: true, resizable: true, width: 150
            },
            {
                headerName: "No. of cars sold", field: "noOfCarsSold", sortable: true, filter: true, resizable: true, width: 150
            },
            {
                headerName: "Edit", field: "id", resizable: true, width: 75,
                cellRenderer: params => {
                    var link = document.createElement('a');
                    link.href = '#';
                    link.innerText = "Edit";
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        loadEdit(params.data.id);
                    });
                    return link;
                }
            },
        ];

        return (<div style={{ width: "100%", height: "100%" }}>
            <h4 className="text-info">Daily Report Dashboard <FontAwesomeIcon icon={faReceipt} /></h4>
            <div className="form-group" style={{ textAlign: "right" }}>
                <button onClick={this.onRedirectDailyReport} className="btn btn-primary">Add <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ overflow: "hidden", flexGrow: "1" }}>
                    <div
                        id="myGrid"
                        style={{
                            height: "250px",
                            width: "100%"
                        }}
                        className="ag-theme-blue">
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            columnDefs={columnDefs}
                            rowData={dailyReportDashboardItems || []}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default DailyReportDashboard;