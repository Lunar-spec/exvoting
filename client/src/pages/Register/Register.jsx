// components/Register.jsx
import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [constituency, selectedConstituency] = useState('');
  // Assume you have the parent constituency data available in the following format
  const parentConstituenciesData = ['Ashti', 'Karanja', 'Arvi'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/reg`, {
        username,
        password,
        constituency,
        role: 'normal_user',
      }) 
      console.log(response.data)
      navigate('/')
      alert("Registered, you may begin with your login")
    } catch (error) {
      alert("Please check your credentials")
      console.log(error)
    }
    // console.log('Registration form submitted:', { username, password, selectedConstituency });
  };

  return (
    <Container>
      <h2>Register</h2>
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

        <Form.Group controlId="parentConstituency">
          <Form.Label>Constituency</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => selectedConstituency(e.target.value)}
          >
            <option value="">Select Constituency</option>
            {parentConstituenciesData.map((constituency) => (
              <option key={constituency} value={constituency}>
                {constituency}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
