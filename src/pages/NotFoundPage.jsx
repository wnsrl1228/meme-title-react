import styled from "styled-components";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 420px;
    height: 250px;
    margin-top: 100px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const NotFoundPage = () => {

    return (
        <Wrapper>
            <Container>
                <h2>페이지를 찾을 수 없습니다.</h2>
                <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
            </Container>
        </Wrapper>
    )
}

export default NotFoundPage;