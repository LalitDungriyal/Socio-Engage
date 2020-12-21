import React from 'react'
import { Button, Card, Form } from 'react-bootstrap';

const CreatePost = () => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Create Post</Card.Title>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Body</Form.Label>
                            <Form.Control type="text" placeholder="Enter Body" />
                        </Form.Group>

                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Example file input" />
                        </Form.Group>
                    
                        <Button variant="primary" type="submit">
                            Submit Post
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreatePost;