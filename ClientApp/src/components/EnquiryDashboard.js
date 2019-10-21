import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

class EnquiryDashboard extends Component {
    componentDidMount() {
        this.props.setUpEnquiryDashboardForm();
    }
    onRedirectEnquiry = e => {
        this.props.history.push('/enquiry');
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
        const { enquiryDashboardItems } = this.props;

        const loadEdit = id => {
            this.props.history.push({
                pathname: '/enquiry',
                search: `?id=${id}`
            });
        }

        let columnDefs = [{
            headerName: "Id", field: "custId", sortable: true, filter: true, resizable: true, width: 200
        },
        {
            headerName: "Name", field: "customer.name", sortable: true, filter: true, resizable: true, width: 200, tooltipField: "name"
        },
        {
            headerName: "Mobile", field: "customer.mobileNumber", sortable: true, filter: true, resizable: true, width: 100, tooltipField: "mobileNumber"
        },
        {
            headerName: "Email Id", field: "customer.emailId", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "emailId"
        },
        {
            headerName: "Lead Type", field: "leadType", sortable: true, filter: true, resizable: true, width: 100
        },
        {
            headerName: "Status", field: "status", sortable: true, filter: true, resizable: true, width: 100
        },
        // {
        //     headerName: "Next Follow Up", field: "nextFollowUp", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "officeName"
        // },
        {
            headerName: "Vechicle", field: "vechicleDetail", sortable: true, filter: true, resizable: true, width: 250, tooltipField: "vechicleDetail"
        },
        {
            headerName: "Assignee", field: "assignee", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "assignee"
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
            <h4 className="text-info">Enquiry Dashboard <FontAwesomeIcon icon={faSearch} /></h4>
            <div className="form-group" style={{ textAlign: "right" }}>
                <button onClick={this.onRedirectEnquiry} className="btn btn-primary">Add <FontAwesomeIcon icon={faPlus} /></button>
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
                            rowData={enquiryDashboardItems || []}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default EnquiryDashboard;