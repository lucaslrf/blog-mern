import React, { useEffect, useState } from "react";
import {
  PostMainStyled,
  TitlePostMainStyled,
  ContentPostMainStyled,
  PostStyled,
  TitlePostStyled,
  ContentPostStyled,
  CreatorPostStyled,
} from "./styled";
import { Container, Button } from "reactstrap";
import api from "../../services/api";
import BeautyStars from "beauty-stars";
import { useHistory } from "react-router-dom";
import getAutor from "../../helpers/getAutor";
import formatDate from "../../helpers/formatDate";

const Post = ({ post, index, list, my, handle }) => {
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [autor, setAutor] = useState("");

  const loadRatingPost = async () => {
    try {
      const {data} =  await api.get(`/api/rating/bypost/` + post._id);
      console.log('dataRatings: ', data);
      const quantityStarsRating = data.rating && Math.trunc(data.rating.quantityStars/data.rating.quantityRatings);
      setRating(quantityStarsRating);
    } catch (error) {
      console.log(error);
    }
  }

  const getAutorPost = async () =>{
    const name = await getAutor(post.creator);
    setAutor(name);
  }

  useEffect(() => {
    loadRatingPost();
    getAutorPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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
      setRefresh(prev => !prev);
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
            <br />
            <BeautyStars
              size="20px"
              value={rating}
              onChange={value => handlerRatingPost(value, post._id)}
            />
            {list && (
              <Button onClick={() => history.push("/posts/" + post._id)} color="link">
                Ler mais...
              </Button>
            )}
          </PostMainStyled>
        }
        {(index !== 0 || my) && (
          <PostStyled>
            <TitlePostStyled>{post.title}</TitlePostStyled>
            <CreatorPostStyled>
              Autor: {autor} - Criado em: {formatDate(post.postDate)}
            </CreatorPostStyled>
            <ContentPostStyled>{post.content}</ContentPostStyled>
            <br />
            <BeautyStars
              size="20px"
              value={rating}
              onChange={value => handlerRatingPost(value, post._id)}
            />
            {list && (
              <Button onClick={() => history.push("/posts/" + post._id)} color="link">
                Ler mais...
              </Button>
            )}
            {my && (
              <Button onClick={() => history.push("/edit-post/" + post._id)} color="link">
                Editar
              </Button>
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
