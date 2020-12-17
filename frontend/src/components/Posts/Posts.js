import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Base from "../Elements/Base/Base";
import Spinner from "../Elements/Spinner/Spinner";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPostagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarPostagens = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`/api/posts`);
      console.log(data);
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Base>
      <div>
        <div className="container hero">
          <div className="row align-items-center text-center text-md-left">
            <div className="col-lg-4">
              <h1 className="mb-3 display-3">Tell Your Story to the World</h1>
              <p>
                Join with us! Login or Register. Write your story and share !!
              </p>
            </div>
          </div>
        </div>
        <div className="container hero py-5">
          <div className="row">
            <div className="col-md-8 col-xs-12">
              <div className="row">POSTS</div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Posts;
