import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'antd'
import AddModal from './AddModal'
import EditDepartment from './EditDepartment'
 class Departments extends Component {
    
      
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <EditDepartment record={record}></EditDepartment>
              </span>
            ),
          }
          ];
        let table = <Table columns={columns} dataSource={this.props.departments}></Table>
        return [
          
            <h3 style={{display:'inline-block'}}>Departments</h3>,
            <div style={{display:'inline-block',float:'right'}}>
              <AddModal>
              </AddModal>
            </div>,
    
          table];
      }
}
const mapStateToProps = state => {
    return { departments: state.departments };
  }
export default connect(mapStateToProps)(Departments)