import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col} from "reactstrap";
import api from "../../services/api";
import Base from "../../components/Elements/Base/index";

const CreatePost = ({history}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlerCreate = async (title, content) => {
    try {
      const body = {
          title: title,
          content: content,
      }
      await api.post(`/api/posts`, body);
      history.push('/my-posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTitle = (event) => {
     setTitle(event.target.value);
  }

  const handleChangeContent = (event) => {
    setContent(event.target.value);
 }

  return (
    <Base>
      <Form className="m-2">
        <Row>
          <Col>
            <FormGroup>
              <Label for="title">Título</Label>
              <Input
                name="title"
                id="title"
                value={title}
                placeholder="Título"
                onChange={(event) => handleChangeTitle(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Conteúdo</Label>
              <Input
                name="content"
                value={content}
                id="content"
                type="textarea"
                placeholder="Conteúdo"
                onChange={(event) => handleChangeContent(event)}
              />
            </FormGroup>
            <Button onClick={() => handlerCreate(title, content)}>Cadastrar</Button>
          </Col>
        </Row>
      </Form>
    </Base>
  );
};

export default CreatePost;
