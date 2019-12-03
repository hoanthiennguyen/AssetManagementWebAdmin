import AssetList from './AssetList'
import {connect} from 'react-redux'


import React, { Component } from 'react'

class Body extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <AssetList></AssetList>
      </div>
    )
  }
}
export default connect()(Body)

