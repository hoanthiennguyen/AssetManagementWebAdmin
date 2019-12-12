import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Button, List, Form } from 'antd';
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



    handleCancel = () => {
        this.setState({
            visible: false,
            isDeleting: false
        });
    };
    handleOk = () => {
        this.setState({
            visible: false,
            isDeleting: false
        })
        console.log("Deleted :" + this.toBeDeletedEmployees)
        console.log(this.newEmployees.value.split(","))
    }
    handldeDeleteEmployee = (employee) => {
        this.setState({
            isDeleting: true
        })
        this.toBeDeletedEmployees.push(employee);
    }
    render() {
        let arr = this.props.employees.filter(employee => {
            return employee.department.find(department => department.id === this.props.record.id) !== undefined;
        })
        if(this.state.isDeleting) arr = arr.filter(employee =>{
            return !this.toBeDeletedEmployees.includes(employee)
        })
        return (
            [
                <Button onClick={this.showModal}>
                    Edit
                </Button>,
                <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Edit" visible={this.state.visible}>
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 20 }}>
                        <Form.Item label="List employee">
                        <List style={{ marginBottom: 16 }}
                                bordered
                                dataSource={arr}
                                // renderItem={employee => (
                                //     <List.Item
                                //         actions={[<Button onClick={() => this.handldeDeleteEmployee(employee)} type="danger">Delete</Button>]}>
                                //         {employee.email}
                                //     </List.Item>
                                // )}
                            />
                        </Form.Item>


                        <Form.Item className="form-group" label="Add employees">
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
