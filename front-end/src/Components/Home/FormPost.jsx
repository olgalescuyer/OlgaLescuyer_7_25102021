import React from "react";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const FormPost = () => {
  return (
    <Form className="">
      <div>Create a post</div>
      <Form.Group className="mb-3" controlId="title">
      <FloatingLabel controlId="title" label="titre"> 
          <Form.Control type="text" placeholder="title" className="" />
       </FloatingLabel>

        <Form.Text className="text-muted ps-2 d-none">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="" controlId="text">
      <FloatingLabel controlId="text" label="what's on your mind ?">
        <Form.Control as="textarea" rows={3} placeholder="text" style={{ height: '100px' }}/>
       </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </Form>
  );
};

export default FormPost;
