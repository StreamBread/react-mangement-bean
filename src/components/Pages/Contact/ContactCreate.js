import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input } from 'antd'
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('contactStore') @observer
class ContactFormWrapper extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                description: values.description,
            }
            if (!err) {
                this.props.contactStore.addContact(params)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Name'>
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your Contact name',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_EMAIL'></FormattedMessage>}
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_SMS'></FormattedMessage>}>
                {getFieldDecorator('phoneNumber', {
                    rules: [{
                        required: true, message: 'Please input your phone number!'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Description'>
                {getFieldDecorator('description', {
                    rules: [{
                        // required: true, message: 'Please input your Contact name',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/contacts`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const ContactForm = Form.create()(ContactFormWrapper)

@inject('contactStore') @observer
class ContactCreate extends Component {
    render() {

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.contactStore.loading}>
                <ContactForm />
            </Spin>
        </Layout>
    }
}

export default ContactCreate

