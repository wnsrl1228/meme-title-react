
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/AuthProvider";
import { guestAxiosInstance } from "../api/axiosInterceptors";

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

const RedirectionPage = () => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();
    const { login } = useAuth();
    
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/")
        return;
      }
      if (code == null) {
        alert("로그인에 실패하였습니다.")
        navigate("/")
      }
      guestAxiosInstance.get("/login/kakao", {params: {code: code}}).then((r) => {
        localStorage.setItem("ACCESS_TOKEN", r.data.accessToken)
        login()
        navigate('/');
      }).catch((err) => {
        alert(err);
      });
    }, []);
  
    return (
      <Wrapper>
        <Container>
          <div>로그인 중 입니다.</div>
        </Container>
      </Wrapper>
    )
  };
  
  export default RedirectionPage;