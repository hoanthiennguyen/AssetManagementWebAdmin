import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';

export default class ConfirmLogout extends Component {
    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        })
        this.props.handleLogout();
        
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible } = this.state;
        return (
            [
                <span onClick={this.showModal}>
                    Logout
                </span>,
                <Modal
                    title="Confirm dialog"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Are you sure you want to logout?</p>
                </Modal>
            ]
        );
    }
}