import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import EditAssetType from './EditAssetType'
import DeleteAssetType from './DeleteAssetType'
import AddAssetType from './AddAssetType'
import {Divider} from 'antd'
import { Table } from 'antd'
class AssetTypes extends Component {
    
    render() {
        if(!this.props.authorized)
            return <Redirect to="/login"></Redirect>
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
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                },
                {
                    title: 'Department',
                    dataIndex: 'department',
                    key: 'department',
                    render: (data) => data.name
                  },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record) => (
                    <span>
                      <EditAssetType record={record}></EditAssetType>
                      <Divider type="vertical"></Divider>
                      <DeleteAssetType record={record}></DeleteAssetType>
                    </span>
                  ),
                }
                ];
            let table = <Table columns={columns} dataSource={this.props.assetTypes}></Table>
        return (
            [<h3 style={{display:'inline-block'}}>AssetTypes</h3>,
            <div style={{display:'inline-block',float:'right'}}>
              <AddAssetType></AddAssetType>
            </div>,
              table]
        )
    }
}
const mapStateToProps = state => {
    return { departments: state.departments,
            assetTypes: state.assetTypes,
            employees: state.employees};
  }
export default connect(mapStateToProps)(AssetTypes)