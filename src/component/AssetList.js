import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../api/index'
import { setAssetList, setAssetTypes } from '../action/index'
import { Table, Divider, Button } from 'antd'
import CustomModal from './CustomModal'

class AssetList extends Component {
  state = {
    isModalVisible: false,
    modalContent: null,
  }
  componentDidMount = () => {
    api.getAllAsset().then(assetList => {
      this.props.dispatch(setAssetList(assetList));
    })
    api.getAllAssetTypes().then(assetTypes => {
      this.props.dispatch(setAssetTypes(assetTypes));
    })
  }
  handleEdit = (record) => {
    this.setState({
      ...this.state,
      isModalVisible: true,
      modalContent: record
    });
  }
  handleSave = () => {
    this.setState({
      ...this.state,
      isModalVisible: false,
      modalContent: null
    })
  }
  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'assetType',
        key: 'assetType',
        render: (assetType) => assetType.name
      },
      {
        title: 'Status',
        dataIndex: 'currentStage',
        key: 'status',
        render: (currentStage) => currentStage.status
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button onClick={() => this.handleEdit(record)}>Edit</Button>
            <Divider type="vertical"></Divider>
            <Button >Delete</Button>
          </span>
        ),
      }];
    let modal = this.state.isModalVisible ? <CustomModal visible={this.state.isModalVisible} onSave={this.handleSave} record={this.state.modalContent}></CustomModal> : null;
    let table = <Table columns={columns} dataSource={this.props.list}></Table>
    return [<h3>Asset</h3>,
      modal,
      table];
  }
}

const mapStateToProps = state => {
  return { list: state.assetList};
}
export default connect(mapStateToProps)(AssetList)