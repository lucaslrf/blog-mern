import React from 'react'
import { Container } from './styles';

export default function Base(children) {
    return (
        <Container>
            {children}
        </Container>
    );
}
