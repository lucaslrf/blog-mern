import React, {} from "react";
import Base from "../../components/Elements/Base/index";
import Posts from '../../components/Posts';
import {Button} from 'reactstrap';

const MyPosts = ({history}) => {
  return (
    <Base>
      <Button className="m-2" onClick={() => history.push("/new-post")}>Cadastrar</Button>
      <Posts my={true}/>
    </Base>
  );
}

export default MyPosts;
