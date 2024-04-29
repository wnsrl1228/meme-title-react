import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    max-width: 860px;
    display: grid;
    grid-gap: 32px;
    
    /* 3개, 2개, 1개의 그리드로 조정 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Container = styled.div`
    width: calc(100%);
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    background: white;
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`

// 이미지를 스타일링할 컴포넌트 정의
const ImageWrapper = styled.div`
  width: inherit; // 너비 설정'
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
  background-color: gainsboro;
`;


const TitleListLoading = () => {

    return (
        <Wrapper>
            <Container>
                <ImageWrapper>
                    </ImageWrapper>
                <TitleText></TitleText>
            </Container>
            <Container>
                <ImageWrapper>
                    </ImageWrapper>
                <TitleText></TitleText>
            </Container>
            <Container>
                <ImageWrapper>
                    </ImageWrapper>
                <TitleText></TitleText>
            </Container>
            <Container>
                <ImageWrapper>
                    </ImageWrapper>
                <TitleText></TitleText>
            </Container>
        </Wrapper>
    )
}

export default TitleListLoading;