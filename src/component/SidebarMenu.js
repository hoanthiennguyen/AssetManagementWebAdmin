import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import ConfirmLogout from './ConfirmLogout';
const { SubMenu } = Menu;

export default class SidebarMenu extends Component {
  render() {
    if(!this.props.authorized)
          return <div></div>
    return (
      <Menu
        style={{ width: 256, height:"100%"}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline">
        <Menu.Item key="0">
          <span style={{fontSize:22}}>Asset Management</span>
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span><Link to="/">Reports</Link></span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="desktop" />
              <span>Asset Management</span>
            </span>
          }
        >
          <Menu.Item key="5"><Link to="/assets">Add/Remove Asset</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/asset-types"></Link>Asset Types</Menu.Item>
        </SubMenu>
        <Menu.Item key="3">
          <Icon type="apartment" />
          <span><Link to="/departments">Departments</Link></span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="logout" />
          <ConfirmLogout handleLogout={this.props.handleLogout}></ConfirmLogout>
        </Menu.Item>
      </Menu>
    )
  }
}
