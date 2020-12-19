import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import api from "../../services/api";
import Base from "../Elements/Base";
import Spinner from "../Elements/Spinner";
import Post from "../Post";

const Report = () => {
  const [filtro, setFiltro] = useState("none");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [my, setMy] = useState(false);

  const handlerDelete = async () => {
    setReloadPosts(!reloadPosts);
  };

  const buscarPostagensAll = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts`);
      console.log("dataPosts: ", data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const buscarPostagensMy = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts/my-posts`);
      console.log("dataPosts: ", data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const buscarPostagensRating = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts/my-posts`);
      console.log("dataPosts: ", data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const buscarPostagensDate = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/posts/bydate`);
      console.log("dataPosts: ", data.posts);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const applyFilter = (filtro) => {
    setMy(false);
    if (filtro === "none") {
      setMy(true);
      buscarPostagensAll();
    } else if (filtro === "my-posts") {
      buscarPostagensMy();
    } else if (filtro === "posts-date") {
      buscarPostagensDate();
    } else if (filtro === "posts-rating") {
      buscarPostagensRating();
    }
  };

  useEffect(() => {
    applyFilter(filtro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    <Spinner></Spinner>;
  }

  return (
    <Base>
      <Container>
        <Form className="m-2">
          <FormGroup>
            <Label for="exampleSelect">Filtrar posts por: </Label>
            <Input type="select" name="select" id="exampleSelect">
              <option value={filtro} onChange={setFiltro("none")}>
                Nenhum
              </option>
              <option value={filtro} onChange={setFiltro("my-posts")}>
                Meus posts
              </option>
              <option value={filtro} onChange={setFiltro("posts-date")}>
                Posts mais recentes
              </option>
              <option value={filtro} onChange={setFiltro("posts-rating")}>
                Posts mais bem avaliados
              </option>
            </Input>
          </FormGroup>
          <Button>Filtrar</Button>
        </Form>
        {!!posts.length &&
          posts.map((post, index) => (
            <Post
              key={`$post-${index}`}
              post={post}
              index={index}
              list={true}
              my={my}
              handle={handlerDelete}
            />
          ))}
        {!posts.length && <p>Você não tem nenhum post cadastrado</p>}
      </Container>
    </Base>
  );
};

export default Report;
