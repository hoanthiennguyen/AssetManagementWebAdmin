import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

export default class Reports extends Component {
    render() {
        if(!this.props.authorized)
            return <Redirect to="/login"></Redirect>
        return (
            <div>
                <iframe width="800" height="450" title="Reports" src="https://datastudio.google.com/embed/reporting/6db73fb9-8df4-4918-ac5f-7bf0295560d8/page/p5i8" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
            </div>
        )
    }
}
