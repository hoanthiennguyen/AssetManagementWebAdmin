import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Button, Form, Select } from 'antd';
import * as api from '../api/index'
import { addDepartment, addEmployees } from '../action/index'
const { Option } = Select;
class AddDepartment extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleChange = (employees) => {
        this.addedEmployees = employees.map(employee =>{
            return{
                ...employee,
                department: employee.department.concat(this.props.record)
            }
        })
    }

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
        let emails = this.newEmployees.value.split(",")
        
        let department = {
            name: this.name.value,
            description: this.description.value
        }
        api.addDepartment(department).then(department =>{
            this.props.dispatch(addDepartment(department))
            let employees = emails.map(email => {
                return {
                    "username": email,
                    "email": email,
                    "password": "",
                    "fullName": email,
                    "department": [department]
                }
            })
            api.addEmployees(employees).then(employees =>{
                this.props.dispatch(addEmployees(employees))
                this.setState({
                    visible: false,
                    confirmLoading: false,
                })
            })
        })
    }
    render() {
        let options = this.props.employees.map(employee => <Option key={employee.id} value={employee.id}>{employee.email}</Option>)
        return (
            [
                <Button onClick={this.showModal}>
                    Add Department
                </Button>,
                <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Add" visible={this.state.visible}>
                    <Form labelCol={{ span: 12 }} wrapperCol={{ span: 20 }}>
                        <Form.Item className="form-group" label="Name" labelAlign="left">
                            <input className="form-control" ref={el => this.name = el} type="text"  />
                        </Form.Item>
                        <Form.Item className="form-group" label="Description" labelAlign="left">
                            <textarea className="form-control" ref={el => this.description = el} type="text" />
                        </Form.Item>

                        <Form.Item label="Select from available employees" labelAlign="left">
                            <Select
                                mode="multiple"
                                size='default'
                                placeholder="Please select"
                                onChange={this.handleChange}
                                style={{ width: '100%' }}
                            >
                                {options}
                            </Select>
                        </Form.Item>
                        <Form.Item className="form-group" label="Add employees" labelAlign="left">
                            <textarea className="form-control" ref={el => this.newEmployees = el} type="text" />
                        </Form.Item>
                    </Form>
                </Modal>
            ]
        )
    }
}



const mapStateToModalProps = state => ({
    employees: state.employees,
})
export default connect(mapStateToModalProps)(AddDepartment)
