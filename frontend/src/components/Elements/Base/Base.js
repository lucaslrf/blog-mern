import React from 'react'
import Header from './Header/Header';
import { Container } from './styles';

const Base = (props) => {
    return (
        <Container>
            <Header />
            {props.children}
        </Container>
    );
}

export default Base;
