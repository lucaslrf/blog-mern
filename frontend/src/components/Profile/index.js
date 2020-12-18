import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import api from "../../services/api";
import auth from "../../services/auth";
import Base from "../Elements/Base";
import Spinner from "../Elements/Spinner";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `api/profile/bycreator/${auth.getUserId()}`
        );
        console.log(data);
        setNome(data.profile.username);
        setBio(data.profile.bio);
        setProfile(data.profile);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChangeNome = (event) => {
    setNome(event.target.value);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };

  const handleUpdateProfile = async (nome, bio) => {
    try {
      const bodyUpdate = {
        id: profile._id,
        username: nome,
        bio: bio,
        userId: auth.getUserId()
      };
      const { data } = await api.put(`api/profile/edit/${profile._id}`, bodyUpdate);
      console.log('data update profile: ', data);
      history.push('/')
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Base>
      <div className="d-flex align-items-center justify-content-center">
        <Form className="w-50 m-2">
          <Row>
            <Col>
              <FormGroup>
                <Label for="nome">Nome</Label>
                <Input
                  type="nome"
                  name="nome"
                  id="nome-profile"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => handleChangeNome(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio-profile"
                  placeholder="Fale um pouco sobre você"
                  value={bio}
                  onChange={(e) => handleChangeBio(e)}
                />
              </FormGroup>
              <Button onClick={() => handleUpdateProfile(nome, bio)}>
                Salvar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Base>
  );
};

export default Profile;
