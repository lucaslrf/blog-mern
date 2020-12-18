import React, { useState, useEffect, useParams } from "react";
import api from "../../services/api";
import Base from "../../components/Elements/Base/index";
import Spinner from "../../components/Elements/Spinner/index";
import { Button, Form, FormGroup, Label, Input, Row, Col} from "reactstrap";

const EditPost = ({ match, history }) => {
  const { id } = match.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const handlerUpdate = async (title, content) => {
    try {
      const body = {
          title: title,
          content: content,
      }
      await api.put(`/api/posts/`+id, body);
      history.push('/my-posts');
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPost = async () => {
    setLoading(true);
    try {
      const {data} = await api.get(`/api/posts/`+id);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPost();
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

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
           <Button onClick={() => handlerUpdate(title, content)}>Salvar</Button>
         </Col>
       </Row>
     </Form>
   </Base>
 );
}

export default EditPost;
