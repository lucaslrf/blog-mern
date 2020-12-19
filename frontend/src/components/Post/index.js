import React, { useEffect, useState } from "react";
import Spinner from "../Elements/Spinner/index";
import {
  PostMainStyled, 
  TitlePostMainStyled, 
  ContentPostMainStyled, 
  PostStyled, 
  TitlePostStyled, 
  ContentPostStyled,
  CreatorPostStyled,
  Link,
} from "./styled";
import {Container, Button} from 'reactstrap';
import api from "../../services/api";
import Comment from "../Comment";

const Post = ({post, index, list, my, handle}) => {
  const handlerDeletePost = async (id) => {
    try {
      await api.delete(`/api/posts/`+id);
      handle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <>
        {index === 0 && !my && <PostMainStyled>
          <TitlePostMainStyled>{post.title}</TitlePostMainStyled>
          <ContentPostMainStyled>{post.content}</ContentPostMainStyled>
        </PostMainStyled>}          
        {(index !== 0 || my) && <PostStyled>
          <TitlePostStyled>{post.title}</TitlePostStyled>
          <CreatorPostStyled>Autor: {post.creator} - Criado em: {post.postDate}</CreatorPostStyled>
          <ContentPostStyled>{post.content}</ContentPostStyled>
          {list && <Link to={{pathname: '/posts/'+post._id}}>Ler mais...</Link>}
          {my && <Link to={{pathname: '/edit-post/'+post._id}}>Editar</Link>}
          {my && <Button onClick={() => handlerDeletePost(post._id)} color="link">Excluir</Button>}
        </PostStyled>}
      </>
    </Container>
  );
}

export default Post;
