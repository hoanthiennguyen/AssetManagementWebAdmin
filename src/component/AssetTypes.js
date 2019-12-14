import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
export default class AssetTypes extends Component {
    render() {
        if(!this.props.authorized)
            return <Redirect to="/login"></Redirect>
        return (
            <div>
                AssetTypes
            </div>
        )
    }
}
