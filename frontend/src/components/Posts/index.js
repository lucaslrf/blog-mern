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

const Posts = ({my}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadPosts, setReloadPosts] = useState(false);

  const handlerDelete = async () => {
    setReloadPosts(!reloadPosts);
  };

  const buscarPostagens = async () => {
    setLoading(true);
    try {
      const { data } = my ? await api.get(`/api/posts/my-posts`) : await api.get(`/api/posts`);
      console.log(data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPostagens();
  }, [reloadPosts]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Container>
      {posts.map((post, index) => (
        <Post key={`$post-${index}`} post={post} index={index} list={true} my={my} handle={handlerDelete}/>
      ))} 
    </Container>
  );
}

export default Posts;
