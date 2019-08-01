import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input, Select, message, Switch } from 'antd'
import { FormattedMessage } from 'react-intl';
import utils from './DeviceUtils';

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('deviceStore', 'skillStore') @observer
class CreateFormWrapper extends Component {

    componentDidMount() {
        this.props.skillStore.getSkills(1)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                ...values
            }
            if (!err) {
                this.props.deviceStore.addDevice(params, 1)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const { skillsList } = this.props.skillStore

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Serial Number'>
                {getFieldDecorator('serialNumber', {
                    rules: [{
                        required: true, message: 'Please input your Room Serial Number',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Name'>
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your Device Name'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Vendor'>
                {getFieldDecorator('vendor', {
                    rules: [{
                        // required: true, message: 'Please input your Device Vender'
                    }],
                })(
                    <Select
                        placeholder="Select a Vendor"
                    // onChange={this.handleSelectChange}
                    >
                        {utils.getVendorEm().map(vendor => <Option key={vendor} value={vendor}>{vendor}</Option>)}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Device Type'>
                {getFieldDecorator('deviceType', {
                    rules: [{
                        // required: true, message: 'Please input your Device Device Type'
                    }],
                })(
                    <Select
                        placeholder="Select a Device Type"
                    // onChange={this.handleSelectChange}
                    >
                        {utils.getTypeEm().map(type => <Option key={type} value={type}>{type}</Option>)}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Skills'>
                {getFieldDecorator('skillIds',{
                    valuePropName: 'value',
                    // initialValue: [...],
                }, {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Select
                    mode="multiple"
                    optionFilterProp='children'
                    placeholder="Please select Skills"
                    showSearch>
                        {skillsList.data ? skillsList.data.map(skill => {
                            return <Option key={skill.id} value={skill.id}>{skill.name}</Option>
                        }) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='MAC Address'>
                {getFieldDecorator('macAddress', {
                    rules: [{
                        // required: true, message: 'Please input your macAddress'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Status'>
                {getFieldDecorator('status', {
                    valuePropName: 'checked',
                    // initialValue: [...],
                }, {
                    rules: [{
                        // required: true, message: 'Please input your Device Status'
                    }],
                })(
                    <Switch checkedChildren="Enable" unCheckedChildren="Disable" />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/devices`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const CreateForm = Form.create()(CreateFormWrapper)

@inject('deviceStore') @observer
class DeviceCreate extends Component {
    render() {

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.deviceStore.loading}>
                <CreateForm />
            </Spin>
        </Layout>
    }
}

export default DeviceCreate

