import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Spinner from "../Elements/Spinner/index";
import Post from "../Post";
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarPostagens = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts`);
      console.log(data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPostagens();
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Container>
      {posts.map((post, index) => (
        <>
        <Post post={post} index={index} list={true} />
        </>
      ))} 
    </Container>
  );
}

export default Posts;
