import styled from "styled-components";
import kakaoLoginImage from "../assets/kakao_login_large_wide.png"
import { KAKAO_AUTH_API_URL } from "../constants/api";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
`;

const Container = styled.div`
    width: 100%;
    max-width: 420px;
    background-color: gainsboro;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    padding: 120px 40px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;
const KakaoLoginButton = styled.a`
    display: inline-block;
    width: 100%; /* 버튼의 너비 */
    height: 100px; /* 버튼의 높이 */
    background-image: url(${kakaoLoginImage}); /* Facebook 로고 이미지 적용 */
    background-color: '#FFDC00';
    background-size: contain; /* 이미지 크기 조정 */
    background-repeat: no-repeat; /* 이미지 반복 방지 */
    background-position: center; /* 이미지 중앙 정렬 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 커서를 포인터로 변경하여 버튼임을 나타냄 */
    /* 기타 스타일링 */
    color: #fff; /* 텍스트 색상 */
    font-size: 16px; /* 텍스트 크기 */
    text-align: center; /* 텍스트 가운데 정렬 */
    line-height: 50px; /* 텍스트 세로 가운데 정렬 */
    text-decoration: none; /* 링크 텍스트에 밑줄 제거 */
`;

const LoginPage = (props) => {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(-1);
            return;
        }
    }, [])

    return (
        <Wrapper>
            <Container>
                <KakaoLoginButton href={KAKAO_AUTH_API_URL}></KakaoLoginButton>
            </Container>
        </Wrapper>
    )
}
export default LoginPage;