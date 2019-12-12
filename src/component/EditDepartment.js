import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Button, List, Form, Select } from 'antd';
import * as api from '../api/index'
import { updateDepartment, addEmployees } from '../action/index'
const { Option } = Select;
class EditDepartment extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        isDeleting: false
    };
    toBeDeletedEmployees = [];
    employees = this.props.employees.filter(employee => {
        return employee.department.find(department => department.id === this.props.record.id) !== undefined;
    })
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
            // isDeleting: false
        })
        // console.log("Deleted :" + this.toBeDeletedEmployees)
        let emails = this.newEmployees.value.split(",")
        let employees = emails.map(email => {
            return {
                "username": email,
                "email": email,
                "password": "",
                "fullName": email,
                "department": [this.props.record]
            }
        })
        let editedDepartment = {
            ...this.props.record,
            name: this.name.value,
            description: this.description.value
        }
        console.log(editedDepartment)
        console.log(employees)
        Promise.all([api.updateDepartment(editedDepartment), api.addEmployees(employees)]).then((values) => {
            this.props.dispatch(updateDepartment(values[0]))
            this.props.dispatch(addEmployees(values[1]))
            this.setState({
                visible: false,
                confirmLoading: false,
            })
        })
    }
    // handldeDeleteEmployee = (employee) => {
    //     this.setState({
    //         isDeleting: true
    //     })
    //     this.toBeDeletedEmployees.push(employee);
    // }
    render() {
        let arr = this.props.employees.filter(employee => {
            return employee.department.find(department => department.id === this.props.record.id) !== undefined;
        })
        console.log(arr)
        // if (this.state.isDeleting) arr = arr.filter(employee => {
        //     return !this.toBeDeletedEmployees.includes(employee)
        // })
        let notInDepartmentEmp = this.props.employees.filter(employee => {
            return employee.department.find(department => department.id === this.props.record.id) === undefined;
        })
        let options = notInDepartmentEmp.map(employee => <Option key={employee.id} value={employee.id}>{employee.email}</Option>)
        return (
            [
                <Button onClick={this.showModal}>
                    Details/Edit
                </Button>,
                <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Edit" visible={this.state.visible}>
                    <Form labelCol={{ span: 12 }} wrapperCol={{ span: 20 }}>
                        <Form.Item className="form-group" label="Name" labelAlign="left">
                            <input className="form-control" ref={el => this.name = el} type="text" defaultValue={this.props.record.name} />
                        </Form.Item>
                        <Form.Item className="form-group" label="Description" labelAlign="left">
                            <textarea className="form-control" defaultValue={this.props.record.description} ref={el => this.description = el} type="text" />
                        </Form.Item>
                        <Form.Item label="List employee" labelAlign="left">
                            <List style={{ marginBottom: 16 }}
                                bordered
                                dataSource={arr}
                                renderItem={employee => (
                                    <List.Item>
                                        {employee.email}
                                    </List.Item>
                                )}
                            />
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
export default connect(mapStateToModalProps)(EditDepartment)
