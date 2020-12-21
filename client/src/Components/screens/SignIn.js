import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Sign In</Card.Title>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Link to="/signup">Don't have an Account?</Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignIn;