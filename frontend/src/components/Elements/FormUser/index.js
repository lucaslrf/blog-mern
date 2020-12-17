import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import api from "../../../services/api";
import { Link } from "react-router-dom";

const FormUser = ({ isLogin }) => {

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const login = isLogin;

  const handlerSignup = async (email, password, confirmPassword) => {

    if(confirmPassword !== password){
        console.log('senhas diferentes: ', confirmPassword, password);
        return false;
    }

    try {
        const body = {
            email: email,
            password: password,
        }
      const { data } = await api.post(`/api/user/signup`, body);
      console.log(data);
    } catch (error) {
        console.log(error);
    }
  };

  const handlerLogin = async (email, password) => {
    try {
        const body = {
            email: email,
            password: password,
        }
        const { data } = await api.post(`/api/user/login`, body);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  };

  const handleChangeEmail = (event) => {
     setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
 }

 const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
 }

 const handleChangeNome = (event) => {
    setNome(event.target.value);
 }

  return (
    <Form className="w-50 m-2">
      <Row>
        <Col>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email-user"
              value={email}
              placeholder="E-mail"
              onChange={(event) => handleChangeEmail(event)}
            />
          </FormGroup>
          {login ? (
            <>
             <FormGroup>
                <Label for="password">Senha</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  id="password-user"
                  placeholder="Senha"
                  onChange={(event) => handleChangePassword(event)}
                />
                </FormGroup>
              <Button onClick={() => handlerLogin(email, password)}>Entrar</Button>
              <Row>
                <Link to="/register" style={{marginTop:"10px"}}>Cadastre-se</Link>
              </Row>
            </>
          ) : (
            <>
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input
                type="name"
                name="name"
                value={nome}
                id="name-user"
                placeholder="Nome"
                onChange={(event) => handleChangeNome(event)}
              />
            </FormGroup>
             <FormGroup>
              <Label for="password">Senha</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id="password-user"
                placeholder="Senha"
                onChange={(event) => handleChangePassword(event)}
              />
            </FormGroup>
              <FormGroup>
                <Label for="confim-password">Confirmar Senha</Label>
                <Input
                  type="password"
                  name="confim-password"
                  id="confim-password-user"
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(event) => handleChangeConfirmPassword(event)}
                />
              </FormGroup>
              <Button onClick={() => handlerSignup(email, password, confirmPassword)}>Cadastrar</Button>
            </>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default FormUser;
