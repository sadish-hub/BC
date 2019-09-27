import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import TextAreaInput from './TextAreaInput';
import CheckBoxInput from './CheckBoxInput';
import CustomTooltip from './CustomTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import './SaveBar.css';

class CustomerDashboard extends Component {
    componentDidMount() {
        this.props.setUpCustomerDashboardForm();
    }

    onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const selectedDataStringPresentation = selectedData.map(node => node.id)
        this.props.addMessage("customerIds", selectedDataStringPresentation);
        this.props.sendMessage();
        //alert(`Selected nodes: ${selectedDataStringPresentation}`)
        //let test = this.gridApi.getSelectedRows();
        //console.log(test);
        this.gridApi.deselectAll();

    }

    onRedirectCustomer = e => {
        this.props.history.push('/customer');
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
        const { customerDashboardItems, customerMessage, addMessage } = this.props;

        const loadEdit = id => {
            this.props.history.push({
                pathname: '/customer',
                search: `?id=${id}`
            });
        }

        let columnDefs = [{
            headerName: "Name", field: "name", sortable: true, filter: true, checkboxSelection: true, resizable: true, width: 200, tooltipField: "name", tooltipComponentParams: { color: "#ececec" }
        },
        {
            headerName: "Id", field: "custId", sortable: true, filter: true, resizable: true, width: 200
        },
        {
            headerName: "Mobile", field: "mobileNumber", sortable: true, filter: true, resizable: true, width: 100, tooltipField: "mobileNumber"
        },
        {
            headerName: "Email Id", field: "emailId", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "emailId"
        },
        {
            headerName: "Religion", field: "religion", sortable: true, filter: true, resizable: true, width: 100
        },
        {
            headerName: "Native", field: "native", sortable: true, filter: true, resizable: true, width: 100
        },
        {
            headerName: "Office Name", field: "officeName", sortable: true, filter: true, resizable: true, width: 150, tooltipField: "officeName"
        },
        {
            headerName: "Vechicles", field: "vechicleNumbers", sortable: true, filter: true, resizable: true, width: 250, tooltipField: "vechicleNumbers"
        },
        {
            headerName: "Vechicle Details", field: "vechicleDetails", sortable: true, filter: true, resizable: true, width: 300, tooltipField: "vechicleDetails"
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

        let defaultColDef = {
            sortable: true,
            tooltipComponent: "customTooltip"
        };
        let frameworkComponents = {
            customTooltip: CustomTooltip
        };

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <h4 className="text-info">Customer Dashboard <FontAwesomeIcon icon={faUsers} /></h4>
                <div className="form-group" style={{ textAlign: "right" }}>
                    <button onClick={this.onRedirectCustomer} className="btn btn-primary">Add <FontAwesomeIcon icon={faPlus} /></button>
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
                                rowData={customerDashboardItems || []}
                                frameworkComponents={frameworkComponents}
                                defaultColDef={defaultColDef}>

                            </AgGridReact>
                        </div>
                    </div>
                </div>
                <br></br>
                <TextAreaInput
                    handleChange={(newValue) => addMessage('wish', newValue)}
                    title="Send your wishes"
                    id="wish"
                    value={customerMessage ? customerMessage.wish : ''}
                />

                <div>
                    <CheckBoxInput
                        handleChange={(newValue) => addMessage('sms', newValue)}
                        title="SMS"
                        id="sms"
                        value={customerMessage ? customerMessage.sms : false}
                    />
                    <CheckBoxInput
                        handleChange={(newValue) => addMessage('whatsapp', newValue)}
                        title="Whatsapp"
                        id="whatsapp"
                        value={customerMessage ? customerMessage.whatsapp : false}
                    />

                    <CheckBoxInput
                        handleChange={(newValue) => addMessage('email', newValue)}
                        title="Email"
                        id="email"
                        value={customerMessage ? customerMessage.email : false}
                    />
                </div>
                <div className="form-group SaveBar">
                    <button onClick={this.onButtonClick} className="btn btn-success">Send</button>
                </div>
            </div>
        );
    }
}

export default CustomerDashboard;