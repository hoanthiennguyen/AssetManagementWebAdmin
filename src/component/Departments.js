import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'antd'
import EditDepartment from './EditDepartment'
import AddDepartment from './AddDepartment'
import {Redirect} from 'react-router-dom'
 class Departments extends Component {
    
      
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
              <AddDepartment></AddDepartment>
            </div>,
    
          table];
      }
}
const mapStateToProps = state => {
    return { departments: state.departments };
  }
export default connect(mapStateToProps)(Departments)