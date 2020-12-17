import React, { useState, useEffect, useParams } from "react";
import api from "../../services/api";
import Base from "../../components/Elements/Base/index";
import Spinner from "../../components/Elements/Spinner/index";
import Post from "../../components/Post";
import {Container} from 'reactstrap';

const ViewPost = ({ match, history }) => {
  const { id } = match.params;
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarPost = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts/`+id);
      console.log(data);
      //buscar comentários do post
      setPost(data)
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

  return (
    <Base>
      <Container>
        <Post post={post} index={1} list={false} />
      </Container>
    </Base>
  );
}

export default ViewPost;
