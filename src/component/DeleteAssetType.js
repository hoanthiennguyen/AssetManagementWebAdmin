import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux'
import { deleteAssetType } from '../action/index'
import { deleteAssetType as apiDeleteAssetType } from '../api/index'

class DeleteAssetType extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        failed: false,
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
        apiDeleteAssetType(this.props.record.id).then(payload => {
            if (payload === "Delete asset type successfully") {
                this.props.dispatch(deleteAssetType(this.props.record.id));
                this.setInvisible();
            }
            else
                this.setState({failed: true}, () => {
                    setTimeout(() => this.setInvisible(), 2000)
                })
        });
    };
    setInvisible = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        const {name} = this.props.record;
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
                    onCancel={this.handleCancel}>
                    {this.state.failed ? 
                        <p style={{color:"red"}}>Cannot delete {name} because there's still assets belong to it</p> : 
                        <p>Are you sure you want to delete: {name}</p>}
                </Modal>
            ]
        );
    }
}
export default connect()(DeleteAssetType);