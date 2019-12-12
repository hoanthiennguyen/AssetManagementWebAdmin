import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeleteModal from './DeleteModal'
import { Table, Divider } from 'antd'
import EditModal from './EditModal'
import AddModal from './AddModal'

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
  return { list: state.assetList };
}
export default connect(mapStateToProps)(AssetList)