import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons'

class VechicleDashboard extends Component {
    componentDidMount() {
        this.props.setUpVechicleDashboardForm();
    }
    onRedirectVechicle = e => {
        this.props.history.push('/vechicle');
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
        const { vechicleDashboardItems } = this.props;

        const loadEdit = id => {
            this.props.history.push({
                pathname: '/vechicle',
                search: `?id=${id}`
            });
        }

        let columnDefs = [{
            headerName: "Vechicle Number", field: "vechicleNumber", sortable: true, filter: true, resizable: true, width: 200
        },
        {
            headerName: "Inventory", field: "inventory", sortable: true, filter: true, resizable: true, width: 200, tooltipField: "inventory"
        },
        {
            headerName: "Details", field: "variantDetails", sortable: true, filter: true, resizable: true, width: 300, tooltipField: "variantDetails"
        },
        {
            headerName: "Status", field: "status", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "status"
        },
        {
            headerName: "Year", field: "year", sortable: true, filter: true, resizable: true, width: 100
        },
        {
            headerName: "Kilometer", field: "kilometer", sortable: true, filter: true, resizable: true, width: 100
        },
        {
            headerName: "Registration", field: "registration", sortable: true, filter: true, resizable: true, width: 250, tooltipField: "registration"
        },
        {
            headerName: "Price", field: "budget", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "budget"
        },
        {
            headerName: "Seller Name", field: "sellerName", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "sellerName"
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
            <h4 className="text-info">Vechicle Dashboard <FontAwesomeIcon icon={faBook} /></h4>
            <div className="form-group" style={{ textAlign: "right" }}>
                <button onClick={this.onRedirectVechicle} className="btn btn-primary">Add <FontAwesomeIcon icon={faPlus} /></button>
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
                            rowData={vechicleDashboardItems || []}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default VechicleDashboard;