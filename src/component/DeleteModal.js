import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {deleteAsset} from '../action/index'
import {deleteAsset as apiDeleteAsset} from '../api/index'

class DeleteModal extends Component {
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
            confirmLoading: true,
        });
        apiDeleteAsset(this.props.record.id).then( asset => {
            console.log(asset);
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            this.props.dispatch(deleteAsset(asset.id));
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            [
                <Button type="danger" onClick={this.showModal}>
                    Delete
                </Button>,
                <Modal
                    title="Confirm dialog"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>Are you sure you want to delete: {this.props.record.name}?</p>
                </Modal>
            ]
        );
    }
}
export default connect()(DeleteModal);