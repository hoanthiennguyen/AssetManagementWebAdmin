import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import { Table, Divider } from 'antd'
import EditModal from './EditModal'
import AddModal from './AddModal'
import {Redirect} from 'react-router-dom'
import {STATUS} from './constant'

class AssetList extends Component {
  
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
    if(!this.props.authorized)
            return <Redirect to="/login"></Redirect>
    let filterStatus = STATUS.map(status =>({text: status, value:status}))
    let blocks = this.props.locations.map(location=> location.block)
    let filterBlock = [...new Set(blocks)].map(block => ({text: block, value:block}));
    let filterAssetType = this.props.assetTypes.map(assetType => ({text: assetType.name, value:assetType.name}))
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
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
        filters: filterAssetType,
        onFilter: (value, record) => record.assetType.name === value,
        render: (assetType) => assetType.name
      },
      {
        title: 'Status',
        dataIndex: 'currentStage',
        key: 'status',
        filters: filterStatus,
        onFilter: (value, record) => record.currentStage.status === value,
        render: (currentStage) => currentStage.status
      },
      {
        title: 'Location',
        dataIndex: 'currentStage',
        key: 'location',
        filters: filterBlock,
        onFilter: (value, record) => record.currentStage.location.block === value,
        render: (currentStage) => currentStage.location.block + currentStage.location.room
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <EditModal name="Edit" record={record}></EditModal>
            <Divider type="vertical"></Divider>
            <DeleteModal record={record}></DeleteModal>
          </span>
        ),
      }];
    let table = <Table columns={columns} dataSource={this.props.list}></Table>
    return [
      
        <h3 style={{display:'inline-block'}}>Assets</h3>,
        <div style={{display:'inline-block',float:'right'}}>
          <AddModal>
          </AddModal>
        </div>,

      table];
  }
}

const mapStateToProps = state => {
  return { list: state.assetList,
            locations:state.locations,
            assetTypes: state.assetTypes};
}
export default connect(mapStateToProps)(AssetList)