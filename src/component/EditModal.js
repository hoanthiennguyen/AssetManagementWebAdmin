import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Form, Select, Button } from 'antd';
import * as api from '../api/index'
import { updateAsset } from "../action/index"
const { Option } = Select;
class EditModal extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    filteredEmployees: this.props.employees.filter(employee => {
      return employee.department.find(dept => dept.id === this.props.record.assetType.department.id) !== undefined;
    })
  };
  assetType = this.props.record.assetType;
  status = this.props.record.currentStage.status;
  location = this.props.record.currentStage.location;
  employee = this.props.record.currentStage.employee;

  showModal = () => {
    this.setState({
      visible: true,
    });
  };



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
      id: this.props.record.id,

      name: this.name.value,
      assetType: this.assetType,
      currentStage: {
        fromDate: new Date().toISOString().slice(0, 10),
        status: this.status,
        location: this.location,
        employee: this.employee
      }
    }
    console.log(data)
    api.updateAsset(data).then(asset => {
      this.props.dispatch(updateAsset(asset))
      this.setState({
        confirmLoading: false,
        visible: false
      })
    });

  }
  handleChangeAssetType = (id) => {
    this.assetType = this.props.assetTypes.find(el => el.id === id)
    this.setState({
      filteredEmployees: this.props.employees.filter(employee => {
        return employee.department.find(dept => dept.id === this.assetType.department.id) !== undefined;
      })
    
    })
  }

  render() {
    const locations = this.props.locations.map(location => <Option key={location.id} value={location.id}>{location.block + location.room}</Option>)
    const employees = this.state.filteredEmployees.map(employee => <Option key={employee.id} value={employee.id}>{employee.email ? employee.email : employee.username}</Option>)
    const assetStatuses = ["STABLE", "REMOVED", "DAMAGED", "REPAIRING", "CREATED"].map(status => <Option key={status} value={status}>{status}</Option>)
    const assetTypes = this.props.assetTypes.map(assetType => <Option key={assetType.id} value={assetType.id}>{assetType.name + " (" + assetType.department.name.toUpperCase() + ") "}</Option>)
    return ([
      <Button onClick={this.showModal}>
        Edit
      </Button>,
      <Modal onOk={this.handleOk} confirmLoading={this.state.confirmLoading} onCancel={this.handleCancel} title="Edit" visible={this.state.visible}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item className="form-group" label="Name">
            <input className="form-control" ref={el => this.name = el} type="text" defaultValue={this.props.record.name} />
          </Form.Item>
          <Form.Item label="Types">
            <Select defaultValue={this.assetType.id} onChange={this.handleChangeAssetType}
              placeholder="Select a type">
              {assetTypes}
            </Select>,
          </Form.Item>
          <Form.Item label="Status">
            <Select defaultValue={this.status} onChange={status => { this.status = status; }}
              placeholder="Select a status">
              {assetStatuses}
            </Select>,
          </Form.Item>
          <Form.Item label="Location">
            <Select defaultValue={this.location.id}
              showSearch onChange={id => { this.location = this.props.locations.find(loc => loc.id === id); }}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Select a location">
              {locations}
            </Select>,
          </Form.Item>
          <Form.Item label="Employee">
            <Select defaultValue={this.employee.id}
              onChange={id => { this.employee = this.props.employees.find(employee => employee.id === id); }}
              showSearch
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Select an employee">
              {employees}
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
export default connect(mapStateToModalProps)(EditModal);