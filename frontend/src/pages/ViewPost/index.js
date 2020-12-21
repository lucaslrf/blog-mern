import React, { useState, useEffect, useParams } from "react";
import api from "../../services/api";
import Base from "../../components/Elements/Base/index";
import Spinner from "../../components/Elements/Spinner/index";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import {Container} from 'reactstrap';
import auth from "../../services/auth";

const ViewPost = ({ match }) => {
  const logged = auth.loggedIn();
  console.log(auth.getUserId(), logged);
  const { id } = match.params;
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadComments, setReloadComments] = useState(false);  

  const handlerComments = async () => {
    setReloadComments(!reloadComments);
  };

  const buscarComentarios = async (postId = null) => {
    try {
      if(!postId){
        postId = post._id;
      }
      const { data } = await api.get(`/api/comments/bypost/${postId}`);
      setComments(data.comments);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarComentarios();
  }, [reloadComments]);
  
  const buscarPost = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts/`+id);
      buscarComentarios(data._id);
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
        <br />
        {logged && 
          <>
            <CommentForm post={post} handle={handlerComments}/>
            {comments.map((comment) => (
              <Comment comment={comment} handle={handlerComments}/>
            ))}
          </>
        }
        {!logged && 
          <div style={{textAlign:"center", color: '#6c757d'}}>
            Efetue login para comentar o Post.
          </div>
        }
      </Container>
    </Base>
    
  );
}

export default ViewPost;
