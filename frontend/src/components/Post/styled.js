import styled from 'styled-components';
import {Link as LinkRouter} from 'react-router-dom';


export const PostMainStyled = styled.div`
  width: auto;
  margin: 15px 0;
  background: #000000;
  border-radius: 2px;
  padding: 3rem!important;
  color: #ffffff
`;

export const TitlePostMainStyled = styled.div`
  line-height: 40px;
  width: auto;
  font-size: 40px;
`;

export const ContentPostMainStyled = styled.div`
  width: auto;
  font-size: 20px;    
  margin-top: 10px;
`;

export const PostStyled = styled.div`
  width: auto;
  border-radius: 2px;
  margin-top: 50px;
`;

export const TitlePostStyled = styled.div`
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  line-height: 40px;
  width: auto;
  font-size: 40px;
`;

export const CreatorPostStyled = styled.div`
  color: gray;
  font-size: 12px;   
`;

export const ContentPostStyled = styled.div`
  width: auto;
  font-size: 20px;    
  margin-top: 10px;
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