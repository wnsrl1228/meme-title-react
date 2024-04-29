import { useEffect, useState } from "react";
import TextInput from "../components/common/TextInput";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { guestAxiosInstance, loggedInAxiosInstance } from "../api/axiosInterceptors";



const CreateContainer = styled.div`
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

const ButtonContainer = styled.div`
    width: 100%;
    text-align: right;
    margin-top: 20px;

    :hover {
        background: lightgray;
    }
`
const TitleCreatePage = () => {

    const [title, setTitle] = useState("");
    const {isLoggedIn} = useAuth();
    const {memeId} = useParams();
    const [imgUrl, setImgUrl] = useState("");
    const navigate = useNavigate();

    const handleCreateTitle = () => {
        if (isLoggedIn) {
            if (!title.trim()) {
                alert("제목을 입력해주세요.");
                return;
            }
    
            // 로컬 스토리지에서 accessToken을 가져옵니다.
            const accessToken = localStorage.getItem('ACCESS_TOKEN');
    
            // 서버에 전송할 헤더를 설정합니다.
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            loggedInAxiosInstance.post(`/memes/${memeId}`, { title : title }, {headers})
            .then((response) => {
                // 성공적으로 전송되었을 경우 처리합니다.
                alert('제목이 등록되었습니다.');
                const createdUri = response.headers.location;

                navigate(createdUri);
            })
            .catch((error) => {
                // 전송 중 오류가 발생한 경우 처리합니다.
                alert(error.response.data.message);
            });
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(-1);
            return;
        }
        guestAxiosInstance.get(`/memes/${memeId}`)
        .then((res) => {
            setImgUrl(res.data.imgUrl);
        })
        .catch((error) => {
          // 전송 중 오류가 발생한 경우 처리합니다.
          alert(error.response.data.message);
          navigate(-1)
        });
    }, [])

    return (
        <Wrapper>
            <Container>
                <CreateContainer>
                    <ImageWrapper>
                        <MemeImage src={imgUrl} alt="밈 이미지" />
                    </ImageWrapper>
                    
                    <TextInput
                        height={100}
                        value={title} 
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        placeholder={`짤에 어울리는 제목을 입력해주세요.\n제목은 최대 3개까지 등록할 수 있습니다.`}
                    ></TextInput>
                </CreateContainer>
                <ButtonContainer>
                    <Button title="등록하기" onClick={handleCreateTitle}></Button>
                </ButtonContainer>
            </Container>
        </Wrapper>
    )
};

export default TitleCreatePage;