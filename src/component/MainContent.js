import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Reports from './Reports'
import AssetList from './AssetList'
import AssetTypes from './AssetTypes'
import Departments from './Departments'
import Login from './Login'
import * as api from '../api/index'
import { setAssetList, setAssetTypes, setEmployees, setLocations, setDepartments } from '../action/index'
import { connect } from 'react-redux'
import SidebarMenu from './SidebarMenu';

class MainContent extends Component {
  state = {
    authorized: localStorage.getItem('token') !== null,
  }
  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ authorized: false });
  }
  handleLogin = (token) => {
    localStorage.setItem('token', token)
    this.setState({ authorized: true })
  }
  componentDidMount = () => {
    api.getAllAsset().then(assetList => {
      this.props.dispatch(setAssetList(assetList));
    })
    api.getAllAssetTypes().then(assetTypes => {
      this.props.dispatch(setAssetTypes(assetTypes));
    })
    api.getAllLocations().then(locations => {
      this.props.dispatch(setLocations(locations));
    })
    api.getEmployees().then(employees => {
      this.props.dispatch(setEmployees(employees))
    })
    api.getDepartments().then(departments => {
      this.props.dispatch(setDepartments(departments))
    })
  }
  componentDidUpdate = this.componentDidMount
  render() {
    let {authorized} = this.state
    return (
      [
        <Route path="/login" key="login" render={() =>
          <Login authorized={authorized} handleLogin={this.handleLogin}></Login>}>
        </Route>,
        <SidebarMenu authorized={authorized} handleLogout={this.handleLogout}></SidebarMenu>,

        <div className="main-container">
          <Route key="reports" exact path="/" render={() =>
            <Reports authorized={authorized}></Reports>} />
          <Route key="assets" path="/assets" render={() =>
            <AssetList authorized={authorized}></AssetList>} />
          <Route key="assetType" path="/asset-types" render={() =>
            <AssetTypes authorized={authorized}></AssetTypes>} />
          <Route key="departments" path="/departments" render={() =>
            <Departments authorized={authorized}></Departments>} />
        </div>
      ]
    )
  }
}
export default connect()(MainContent)