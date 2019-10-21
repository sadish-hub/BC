import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons'

class VariantDashboard extends Component {
    componentDidMount() {
        this.props.setUpVariantDashboardForm();
    }
    onRedirectVariant = e => {
        this.props.history.push('/variant');
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
        const { variantDashboardItems } = this.props;

        const loadEdit = id => {
            this.props.history.push({
                pathname: '/variant',
                search: `?id=${id}`
            });
        }

        let columnDefs = [{
            headerName: "Make", field: "make", sortable: true, filter: true, resizable: true, width: 300, tooltipField: "make"
        },
        {
            headerName: "Model", field: "model", sortable: true, filter: true, resizable: true, width: 300, tooltipField: "model"
        },
        {
            headerName: "Variant", field: "variant", sortable: true, filter: true, resizable: true, width: 300, tooltipField: "variant"
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
            <h4 className="text-info">Variant Dashboard <FontAwesomeIcon icon={faBook} /></h4>
            <div className="form-group" style={{ textAlign: "right" }}>
                <button onClick={this.onRedirectVariant} className="btn btn-primary">Add <FontAwesomeIcon icon={faPlus} /></button>
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
                            rowData={variantDashboardItems || []}>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default VariantDashboard;