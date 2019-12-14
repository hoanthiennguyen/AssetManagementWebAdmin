import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Button, Form, Select } from 'antd';
import * as api from '../api/index'
import { updateAssetType } from '../action/index'
const { Option } = Select;
class EditAssetType extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        filteredEmployees: [],
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleCancel = () => {
        this.setState({
            visible: false,
            isDeleting: false
        });
    };
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        })

        let editedAssetType = {
            ...this.props.record,
            name: this.name.value,
            description: this.description.value,
            department: this.selectedDepartment,
            receiverId: this.selectedEmployee? this.selectedEmployee.id : null
        }
        if(this.selectedDepartment == null){
            editedAssetType = {
                ...editedAssetType,
                department: null,
                receiverId: null
            }
        }
        console.log(editedAssetType)
        api.updateAssetType(editedAssetType).then(assetType => {
            this.props.dispatch(updateAssetType(assetType))
            this.setState({
                visible: false,
                confirmLoading: false,
            })
        })
    }
    handleChangeDepartment = (departmentId) => {
        this.selectedDepartment = this.props.departments.find(department => department.id === departmentId);
        this.setState({
            filteredEmployees: this.props.employees.filter(employee => {
                return employee.department.find(dept => dept.id === departmentId) !== undefined;
            })
        })
    }
    handleChangeEmployee = (employeeId) => {
        this.selectedEmployee = this.props.employees.find(employee => employee.id === employeeId)
        console.log(this.selectedEmployee)

    }
    render() {
        let employeeOptions = this.state.filteredEmployees.map(employee =><Option key={employee.id} value={employee.id}>{employee.email}</Option>)
        let options = this.props.departments.map(department => <Option key={department.id} value={department.id}>{department.name}</Option>)
        return (
            [
                <Button onClick={this.showModal}>
                    Edit
                </Button>,
                <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Edit" visible={this.state.visible}>
                    <Form labelCol={{ span: 12 }} wrapperCol={{ span: 20 }}>
                        <Form.Item className="form-group" label="Name" labelAlign="left">
                            <input className="form-control" ref={el => this.name = el} type="text" defaultValue={this.props.record.name} />
                        </Form.Item>
                        <Form.Item className="form-group" label="Description" labelAlign="left">
                            <textarea className="form-control" defaultValue={this.props.record.description} ref={el => this.description = el} type="text" />
                        </Form.Item>


                        <Form.Item label="Select Department" labelAlign="left">
                            <Select
                                defaultValue={this.props.record.department.id}
                                size='default'
                                placeholder="Please select"
                                onChange={this.handleChangeDepartment}
                                style={{ width: '100%' }}
                            >
                                {options}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Employee">
                            <Select
                                onChange={this.handleChangeEmployee}
                                placeholder="Select a temporary owner">
                                {employeeOptions}
                            </Select>,
                        </Form.Item>

                    </Form>
                </Modal>
            ]
        )
    }
}



const mapStateToModalProps = state => ({
    employees: state.employees,
    departments: state.departments
})
export default connect(mapStateToModalProps)(EditAssetType)
