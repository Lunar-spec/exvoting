// components/Login.jsx
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/login`, {
                username,
                password,
            })
            const token = response.data.token;
            localStorage.setItem('Token', token)
            localStorage.setItem('userId', response.data.user_id)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('constituency', response.data.constituency)
            navigate('/home')
            // console.log(response)
        } catch (error) {
            // console.log(error)
            alert("Please recheck your credentials")
        }
        // console.log('Login form submitted:', { username, password });
    };

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

            {/* Link to Registration page */}
            <p>
                Don&apos;t have an account? <Link to="/register">Register here</Link>.
            </p>
        </Container>
    );
};

export default Login;
