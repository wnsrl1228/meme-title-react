import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { loggedInAxiosInstance } from "../api/axiosInterceptors";

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

`;

const MemeWrapper = styled.div`
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

const UploadButton = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: -20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #0056b3;
  }
`;

// 파일 input을 스타일링하기 위해 숨겨진 형태로 정의합니다.
const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
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
const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #218838;
  }
`;
const MemeCreatePage = () => {

    const navigate = useNavigate();
    const { isLoggedIn, memberInfo } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setSelectedFile(file);
      };
    
      const handleUpload = () => {
        if (selectedImage) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          loggedInAxiosInstance
            .post("/memes", formData)
            .then((response) => {
              navigate("/");
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
    }

    useEffect(() => {
        if (!isLoggedIn || memberInfo != 1) {
          navigate("/")
          return;
        }
      }, []);

    return (
        <Wrapper>
            <Container>
                <MemeWrapper>
                    <ImageWrapper>
                        {selectedImage && <MemeImage src={selectedImage} alt="Meme" />}
                    </ImageWrapper>
                    <br></br>
                    <label htmlFor="file">
                        <UploadButton>이미지 선택</UploadButton>
                    </label>
                    <FileInput id="file" onChange={handleFileChange} />
                    <SubmitButton onClick={handleUpload}>업로드</SubmitButton>
                </MemeWrapper>

            </Container>
        </Wrapper>
    )
}

export default MemeCreatePage;