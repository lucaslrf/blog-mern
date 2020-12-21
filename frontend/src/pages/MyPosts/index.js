import React, {} from "react";
import Base from "../../components/Elements/Base/index";
import Posts from '../../components/Posts';
import {Button} from 'reactstrap';
import {HeaderMyPosts} from './styled';

const MyPosts = ({history}) => {
  return (
    <Base>
      <HeaderMyPosts>
        <Button className="m-2" onClick={() => history.push("/new-post")}>Criar novo Post</Button>
      </HeaderMyPosts>
      <Posts my={true}/>
    </Base>
  );
}

export default MyPosts;
