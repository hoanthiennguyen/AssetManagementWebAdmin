import React, { Component } from 'react'
import Asset from './Asset'
import {connect} from 'react-redux'
import * as api from '../../api/index'
import {setListAsset} from '../../action/index'

class AssetList extends Component {
    componentDidMount =() =>{
        api.getAllAsset().then(assetList =>{
          this.props.dispatch(setListAsset(assetList));
        })
    }
    render() {
        let assets = this.props.list.map(asset => <Asset onClick={this.props.addAsset} name={asset.name}></Asset>)
        return assets;
    }
}
const mapStateToProps = state => {
    return {list:state.assetList};
}
export default connect(mapStateToProps)(AssetList)