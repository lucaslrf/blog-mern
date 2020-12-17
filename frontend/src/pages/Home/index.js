import React, {} from "react";
import Base from "../../components/Elements/Base/index";
import {Container} from 'reactstrap';
import Posts from '../../components/Posts';

const Home = () => {
  return (
    <Base>
      <Container>
        <Posts />
      </Container>
    </Base>
  );
}

export default Home;
