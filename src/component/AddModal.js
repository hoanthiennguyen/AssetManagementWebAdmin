import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Form, Select, Button } from 'antd';
import * as api from '../api/index'
import { addAsset } from "../action/index"
const { Option } = Select;
class AddModal extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        filteredEmployees: []
    };


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleChangeAssetType = (id) => {
        this.assetType = this.props.assetTypes.find(el => el.id === id)
        this.setState({
            filteredEmployees: this.props.employees.filter(employee => {
                return employee.department.find(dept => dept.id === this.assetType.department.id) !== undefined;
            })

        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true
        })
        let data = {
            name: this.name.value,
            assetType: this.assetType,
            currentStage: {
                fromDate: new Date().toISOString().slice(0, 10),
                status: this.status,
                location: this.location,
                employee: this.employee
            }
        }
        console.log(data);

        api.addAsset(data).then(asset => {
            console.log(asset)
            this.props.dispatch(addAsset(asset))
            this.setState({
                confirmLoading: false,
                visible: false
            })
        })

    }

    render() {
        const locations = this.props.locations.map(location => <Option key={location.id} value={location.id}>{location.block + location.room}</Option>)
        const filteredEmployees = this.state.filteredEmployees.map(employee => <Option key={employee.id} value={employee.id}>{employee.email ? employee.email : employee.username}</Option>)
        const assetStatuses = ["STABLE", "REMOVED", "DAMAGED", "REPAIRING", "CREATED"].map(status => <Option key={status} value={status}>{status}</Option>)
        const assetTypes = this.props.assetTypes.map(assetType => <Option key={assetType.id} value={assetType.id}>{assetType.name + " (" + assetType.department.name.toUpperCase() + ") "}</Option>)
        return ([
            <Button icon="plus" onClick={this.showModal}>
                Add asset
            </Button>,
            <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Add new" visible={this.state.visible}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                    <Form.Item className="form-group" label="Name">
                        <input className="form-control" ref={el => this.name = el} type="text" defaultValue={this.props.record ? this.props.record.name : ""} />
                    </Form.Item>
                    <Form.Item label="Types">
                        <Select onChange={id => { this.handleChangeAssetType(id) }}
                            placeholder="Select a type">
                            {assetTypes}
                        </Select>,
                    </Form.Item>
                    <Form.Item label="Status">
                        <Select onChange={status => { this.status = status; }}
                            placeholder="Select a status">
                            {assetStatuses}
                        </Select>,
                    </Form.Item>
                    <Form.Item label="Location">
                        <Select showSearch onChange={id => { this.location = this.props.locations.find(loc => loc.id === id); }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder="Select a location">
                            {locations}
                        </Select>,
                    </Form.Item>
                    <Form.Item label="Employee">
                        <Select onChange={id => { this.employee = this.props.employees.find(employee => employee.id === id); }}
                            showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder="Select an employee">
                            {filteredEmployees}
                        </Select>,
                    </Form.Item>
                </Form>
            </Modal>
        ])
    }
}
const mapStateToModalProps = state => ({
    locations: state.locations,
    assetTypes: state.assetTypes,
    employees: state.employees,
})
export default connect(mapStateToModalProps)(AddModal);