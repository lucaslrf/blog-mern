import styled from 'styled-components';
import {Link as LinkRouter} from 'react-router-dom';

export const CommentStyled = styled.div`
  width: auto;
  margin-top: 50px;
`;

export const CreatorCommentStyled = styled.div`
  width: auto;
  font-size: 18px;    
  margin-top: 10px; 
`;

export const ContentCommentStyled = styled.div`
  color: gray;
  font-size: 16px;  
`;

export const Link = styled(LinkRouter)`
  display: inline-flex;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  text-decoration: none;
`;