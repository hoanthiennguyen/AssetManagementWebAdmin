import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Select } from 'antd';
import {connect} from 'react-redux'
import {addAssetType as apiAddAssetType} from '../api/index'
import {addAssetType} from '../action/index'
const {Option} = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form, departments, confirmLoading } = this.props;
            const { getFieldDecorator } = form;
            let departmentOptions = departments.map(department =><Option key={department.id} value={department.id}>{department.name}</Option>)
            return (
                <Modal
                    visible={visible}
                    title="Create a new asset type"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    confirmLoading={confirmLoading}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Department">
                            {getFieldDecorator('department', {
                                rules: [{ required: true, message: 'Please select a department!' }],
                            })(
                                <Select placeholder="Select a department">
                                    {departmentOptions}
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

 class AddAssetType extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        this.setState({ confirmLoading: true})
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (!err) {
                let department = this.props.departments.find(department => department.id === values.department)
                let data = {...values, department}
                console.log(data)
                apiAddAssetType([data]).then(assetTypes =>{
                    this.props.dispatch(addAssetType(assetTypes[0]))
                    this.setState({ confirmLoading: false, visible: false });
                })
                
            }


        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button icon="plus" onClick={this.showModal}>
                    Add AssetType
        </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    departments={this.props.departments}
                    confirmLoading={this.state.confirmLoading}
                />
            </div>
        );
    }
}
const mapStateToModalProps = state => ({
    departments: state.departments,
})
export default connect(mapStateToModalProps)(AddAssetType)