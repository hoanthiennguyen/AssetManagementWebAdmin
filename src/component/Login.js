import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import Background from '../img/bg.png'
import { login } from '../api/index'
import { Redirect } from 'react-router-dom'

class MyLogin extends Component {
    state = {}
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values).then(payload => {
                    this.props.handleLogin(payload.jwt)
                }, error => {
                    if(error.status === 401) {
                        this.setState({loginFailed: "Incorrect username or password"})
                    }
                    else {
                        this.setState({loginFailed: "Internal server error"})
                    }
                });

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.props.authorized) {
            return <Redirect to="/"></Redirect>
        }
        return (

            <div style={{
                width: '100%', height: '100%', backgroundImage: `url(${Background})`, backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div style={{
                    width: '40%', position: 'relative', left: '30%', top: '150px', padding: '3%', backgroundColor: 'white'
                    , borderRadius: '10px'
                }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {this.state.loginFailed && <span style={{color:'red'}}>{this.state.loginFailed}</span>}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(MyLogin);

// export default class Login extends Component {
//     state = {
//         authorized: false
//     }
//     render() {
//         if(this.state.authorized)
//             return <Redirect to="/"></Redirect>
//         return (
//             wrapperLogin
//         )
//     }
// }

