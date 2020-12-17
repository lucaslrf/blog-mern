import React from "react";
import {
  PostMainStyled, 
  TitlePostMainStyled, 
  ContentPostMainStyled, 
  PostStyled, 
  TitlePostStyled, 
  ContentPostStyled,
  CreatorPostStyled,
  Link
} from "./styled";
import {Container} from 'reactstrap';

const Post = ({post, index, list}) => {

  return (
    <Container>
      <>
        {index === 0 && <PostMainStyled>
          <TitlePostMainStyled>{post.title}</TitlePostMainStyled>
          <ContentPostMainStyled>{post.content}</ContentPostMainStyled>
        </PostMainStyled>}          
        {index !== 0 && <PostStyled>
          <TitlePostStyled>{post.title}</TitlePostStyled>
          <CreatorPostStyled>Autor: {post.creator} - Criado em: {post.postDate}</CreatorPostStyled>
          <ContentPostStyled>{post.content}</ContentPostStyled>
          {list && <Link to={{pathname: '/posts/'+post._id}}>Ler mais...</Link>}
        </PostStyled>}
      </>
    </Container>
  );
}

export default Post;
