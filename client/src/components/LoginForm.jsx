import React, { useState } from 'react'
import { login, registration } from '../storage/features/userSlice'
import { useDispatch } from "react-redux";
import { Button, Input, Form } from "antd";
import 'antd/dist/antd.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    return (
        <Form>
            <Form.Item>
                <Input placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            </Form.Item>
        
            <Form.Item>
                <Input.Password placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
        
            <Form.Item>
                <Button type="primary" onClick={() => dispatch(login({email,password}))}>
                    Login
                </Button>
                <Button type="primary" onClick={() => dispatch(registration({email,password}))}>
                    Registration
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;