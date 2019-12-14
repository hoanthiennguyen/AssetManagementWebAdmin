import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {deleteAssetType} from '../action/index'
import {deleteAssetType as apiDeleteAssetType} from '../api/index'

class DeleteAssetType extends Component {
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
        apiDeleteAssetType(this.props.record.id).then( payload => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            if(payload === "Delete asset type successfully")
                this.props.dispatch(deleteAssetType(this.props.record.id));
            else
                alert("Cannot delete asset type because there're still some assets belonging to it")
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
                    <p>Are you sure you want to delete this assetType: {this.props.record.name}?</p>
                </Modal>
            ]
        );
    }
}
export default connect()(DeleteAssetType);