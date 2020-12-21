import React, { useEffect, useState } from "react";
import Spinner from "../Elements/Spinner/index";
import {
  CommentStyled, 
  ContentCommentStyled,
  CreatorCommentStyled,
  Link,
} from "./styled";
import {Container, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import api from "../../services/api";
import CommentForm from "../../components/CommentForm";
import auth from "../../services/auth";
import getAutor from "../../helpers/getAutor";
import formatDate from "../../helpers/formatDate";

const Comment = ({comment, handle}) => {
  const my = auth.getUserId() === comment.creator;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [autor, setAutor] = useState("");

  const handleEditComment = async (id) => {
    handle();
    toggle();
  };

  const handlerDeleteComment = async (id) => {
    try {
      await api.delete(`/api/comments/`+id);
      handle();
    } catch (error) {
      console.log(error);
    }
  };

  //useeffect para buscar autor  
  const getAutorComment = async () =>{
    const name = await getAutor(comment.creator);
    setAutor(name);
  }

  useEffect(() => {
    getAutorComment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <CommentStyled>
        <CreatorCommentStyled>{autor} às {formatDate(comment.commentDate)}</CreatorCommentStyled>
        <ContentCommentStyled>{comment.content}</ContentCommentStyled>
        {my && <Button onClick={() => toggle()} color="link">Editar</Button>}
        {my && <Button onClick={() => handlerDeleteComment(comment._id)} color="link">Excluir</Button>}
      </CommentStyled>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Comentário</ModalHeader>
        <ModalBody>
          <CommentForm comment={comment} handle={handleEditComment}/>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default Comment;
