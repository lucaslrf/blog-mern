import React, { useState } from "react";
import api from "../../services/api";
import {Button, Form, FormGroup, Label, Input, Row, Col, Container} from 'reactstrap';

const CommentForm = ({comment, post, handle}) => {
  const [content, setContent] = useState(comment ? comment.content : "");

  const handlerCreate = async (content) => {
    try {
      const body = {
          content: content,
      }
      // IF CREATE COMMENT, SET POST
      if(post){
        body.post = post._id
      }
      comment ? await api.put(`/api/comments/${comment._id}`, body) : await api.post(`/api/comments`, body);
      setContent('');
      handle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
 }

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="content">Comentário</Label>
              <Input
                name="content"
                value={content}
                id="content"
                type="textarea"
                placeholder="Conteúdo"
                onChange={(event) => handleChangeContent(event)}
              />
            </FormGroup>
            <Button onClick={() => handlerCreate(content)}>Comentar</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CommentForm;
