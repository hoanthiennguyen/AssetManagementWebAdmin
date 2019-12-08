import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { Form, Select } from 'antd';
import * as api from '../api/index'
import {updateAsset} from "../action/index"
const { Option } = Select;
class CustomModal extends Component {
    state = {
      visible: true
    }
    handleOk = () => {
      
      let data = {
        id: this.props.record.id,
        name: this.name.value,
        assetType: this.type
      }
      console.log(data);
      api.updateAsset(data).then(asset=> {
          console.log(asset);
          this.props.dispatch(updateAsset(asset))
        });
      this.props.onSave()
    }
    handleCancel = () => {
        this.props.onSave()
    }
    render() {
      const assetTypes = this.props.assetTypes.map(assetType => <Option key={assetType.id} value={assetType.id}>{assetType.name}</Option>)
      return (
        <Modal onOk={this.handleOk} onCancel={this.handleCancel} title="Edit asset" visible={this.props.visible}>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item className="form-group" label="Name">
              <input className="form-control" ref={el => this.name = el} type="text" defaultValue={this.props.record ? this.props.record.name : ""} />
            </Form.Item>
          <Form.Item label="Types">
              <Select onChange={id => { this.type = this.props.assetTypes.find(el => el.id === id)}}
                placeholder="Select a type">
                {assetTypes}
              </Select>,
          </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
  const mapStateToModalProps = state => ({
    assetTypes: state.assetTypes
  })
  export default connect(mapStateToModalProps)(CustomModal);