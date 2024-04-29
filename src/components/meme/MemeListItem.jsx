import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    cursor: pointer;
    background: white;

`;

const TitleText = styled.p`
    font-size: 36px;
    font-weight: bold;
`

const DateText = styled.p`
    font-size: 32px;
    font-weight: bold;
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

function MemeListItem(props) {
    const {meme, onClick} = props;

    return (
        <Wrapper onClick={onClick}>
            <ImageWrapper>
                <MemeImage src={meme.imgUrl} alt="밈 이미지" />
            </ImageWrapper>
            
            {meme.isInProgress === true ? (
                <TitleText>진행중</TitleText>
            ) : (
                <DateText>{meme.startDate} ~ {meme.endDate}</DateText>
            )}
        </Wrapper>
    )
}

export default MemeListItem;