import styled from "styled-components";

const TitleContainer = styled.div`
    width: 100%;
    max-width: 420px;
    height: 400px;
    padding-bottom: 8px;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    text-align: center;
    margin-bottom: 36px;

`;
const UseWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const TitleLoading = () => {

    return (
        <TitleContainer>
            <UseWrapper></UseWrapper>
        </TitleContainer>
    );
};

export default TitleLoading;