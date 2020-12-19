import React, { useEffect, useState } from "react";
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
import { Container, Button } from "reactstrap";
import api from "../../services/api";
import Comment from "../Comment";
import BeautyStars from "beauty-stars";

const Post = ({ post, index, list, my, handle }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const loadRatingPost = async () => {
      try {
        const {data} =  await api.get(`/api/rating/bypost/` + post._id);
        console.log('dataRatings: ', data);
        const resto = data.rating && data.rating.quantityStars % 5;
        const quantityStarsRating = data.rating ? (resto === 0 ? 5 : resto) : 0;
        setRating(quantityStarsRating);
      } catch (error) {
        console.log(error);
      }
    }

    loadRatingPost();
  }, []);

  const handlerDeletePost = async (id) => {
    try {
      await api.delete(`/api/posts/` + id);
      handle();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerRatingPost = async (value, postId) => {
    setRating(value);
    try {
      const body = {
        quantityStars: value,
        postId: postId
      }
      const {data} = await api.post(`/api/rating`, body);
      console.log('ratings: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <>
        {index === 0 && !my && 
          <PostMainStyled>
            <TitlePostMainStyled>{post.title}</TitlePostMainStyled>
            <ContentPostMainStyled>{post.content}</ContentPostMainStyled>
            <BeautyStars
              size="20px"
              value={rating}
              onChange={value => handlerRatingPost(value, post._id)}
            />
          </PostMainStyled>
        }
        {(index !== 0 || my) && (
          <PostStyled>
            <TitlePostStyled>{post.title}</TitlePostStyled>
            <CreatorPostStyled>
              Autor: {post.creator} - Criado em: {post.postDate}
            </CreatorPostStyled>
            <ContentPostStyled>{post.content}</ContentPostStyled>
            <BeautyStars
              size="20px"
              value={rating}
              onChange={value => handlerRatingPost(value, post._id)}
            />
            {list && (
              <Link to={{ pathname: "/posts/" + post._id }}>Ler mais...</Link>
            )}
            {my && (
              <Link to={{ pathname: "/edit-post/" + post._id }}>Editar</Link>
            )}
            {my && (
              <Button onClick={() => handlerDeletePost(post._id)} color="link">
                Excluir
              </Button>
            )}
          </PostStyled>
        )}
      </>
    </Container>
  );
};

export default Post;
