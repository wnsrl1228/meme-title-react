import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100%);
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgray;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`

// 이미지를 스타일링할 컴포넌트 정의
const ImageWrapper = styled.div`
  width: inherit; // 너비 설정
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
`;

const MemeImage = styled.img`
  width: 100%; // 너비 설정
  height: auto; // 높이 자동 조정
  border-radius: 8px;
  transition: transform 0.3s ease; /* transform 속성에 대한 transition 효과 추가 */
  
  /* 마우스를 이미지 위로 올렸을 때 확대 효과 */
  ${ImageWrapper}:hover & {
    transform: scale(1.1); /* 1.1 배 확대 */
  }
`;

const TitleListItem = (props) => {
    const {title, onClick} = props;

    return (
        <Wrapper onClick={() => {onClick(title)}}>
            <ImageWrapper>
                <MemeImage src={title.imgUrl} alt="밈 이미지" />
            </ImageWrapper>
            <TitleText>{title.title}</TitleText>
        </Wrapper>
    )
}

export default TitleListItem;