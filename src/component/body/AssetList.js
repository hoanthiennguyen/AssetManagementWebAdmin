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
        let assets = this.props.list.map(asset => <Asset key={asset.id} onClick={this.props.addAsset} name={asset.name}></Asset>)
        return [<h3>Asset</h3>,
            assets];
    }
}
const mapStateToProps = state => {
    return {list:state.assetList};
}
export default connect(mapStateToProps)(AssetList)