import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Reports from './Reports'
import AssetList from './AssetList'
import AssetTypes from './AssetTypes'
import Departments from './Departments'
import * as api from '../api/index'
import {setAssetList,setAssetTypes,setEmployees,setLocations, setDepartments} from '../action/index'
import {connect} from 'react-redux'

class MainContent extends Component {
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
    render() {
        return (
                [<Route key="reports" exact path="/" component={Reports} />,
                <Route key="assets" path="/assets" component={AssetList} />,
                <Route key="assetType" path="/asset-types" component={AssetTypes} />,
                <Route key="departments" path="/departments" component={Departments} />]
        )
    }
}
export default connect()(MainContent)