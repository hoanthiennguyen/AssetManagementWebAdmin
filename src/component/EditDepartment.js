import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Button, List, Form, Select } from 'antd';
import * as api from '../api/index'
import { updateDepartment, addEmployees, updateEmployees } from '../action/index'
const { Option } = Select;
class EditDepartment extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        isDeleting: false
    };
    toBeDeletedEmployees = [];
    addedAvaibleEmployees = [];
    addedNewEmployees = [];
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleChange = (employeesID) => {
        this.addedAvaibleEmployees = this.props.employees.filter(el => {
            return employeesID.includes(el.id);
        })
            .map(employee => {
                return {
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

        let emails = this.newEmployees.value.split(",")
        this.addedNewEmployees = emails.map(email => {
            return {
                "username": email,
                "email": email,
                "password": "",
                "fullName": email,
                "department": [this.props.record]
            }
        }).filter(employee => employee.email !== "")
        let editedDepartment = {
            ...this.props.record,
            name: this.name.value,
            description: this.description.value
        }
        if (this.addedNewEmployees.length > 0) {
            api.addEmployees(this.addedNewEmployees).then(employees => {
                this.props.dispatch(addEmployees(employees))
            })
        }
        if (this.addedAvaibleEmployees.length > 0) {
            api.updateEmployees(this.addedAvaibleEmployees)
                .then(employees => {
                    this.props.dispatch(updateEmployees(employees))
                })
        }
        api.updateDepartment(editedDepartment).then(department => {
            this.props.dispatch(updateDepartment(department))
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
