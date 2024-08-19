import { useParams } from "react-router-dom";
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

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const ChatViewPage = () => {
    const {roomId} = useParams();
    return (
        <Wrapper>
            <Container>
                {roomId}
            </Container>
        </Wrapper>
    )
}
export default ChatViewPage;