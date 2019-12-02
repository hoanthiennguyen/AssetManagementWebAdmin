import React, { Component } from 'react'

export default class Asset extends Component {
    render() {
        return (
            <li onClick={()=>this.props.onClick(this.props.name)}>
                {this.props.name}
            </li>
        )
    }
}
