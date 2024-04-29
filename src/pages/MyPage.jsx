import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TitleList from "../components/meme/TitleList";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import CommentList from "../components/comment/CommentList";
import useScrollPagination from "../hooks/useScrollPagination";
import { loggedInAxiosInstance } from "../api/axiosInterceptors";
import TextInput from "../components/common/TextInput";
import DefaultProfileImage from '../assets/profile_default_640.png';

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
    max-width: 720px;

`;

const ProfileUpdateContiner = styled.div`
    display: flex;
    width: 100%; 
    max-width: 540px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 40px 0px;

    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    
`

const ProfileUpdateWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0px;
`;

const MyActivities = styled.div`
    margin: 24px 2px;
    :hover {
        background: lightgray;
    }
`
const MyActivityButton = styled.button`
    margin-right: 6px;
    padding: 10px 40px;
    background-color: white;
    border: 1px solid gainsboro;
    border-radius: 4px;

`
const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 16px;
`;

const NicknameInput = styled.input`

    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background-color: gainsboro;

    &:focus {
        background-color: white;
    } 
`;
const EmailInput = styled.input`
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background-color: gainsboro;
`;

const Button = styled.button`
    width: 80%;
    padding: 16px 0px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3; /* 마우스 커서를 올렸을 때의 색상 */
    }
`;

const ProfileLabel = styled.p`
    font-size: 24px;
    font-weight: bold;
`
const Label = styled.label`
  margin-bottom: 2px;
  display: block;
  font-size: 14px;
`;

const Score = styled.span`
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;

`;

const TextInputContainer = styled.div`
    width: 80%;
    padding-bottom: 20px;
`
// 파일 업로드 버튼을 스타일링합니다.
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
const MyPage = (props) => {

    const [titles, setTitles] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    const [nickname, setNickname] = useState("");
    const [imgUrl, setImgUrl] = useState(null);
    const [email, setEmail] = useState("");
    const [score, setScore] = useState("");
    const [introduction, setIntroduction] = useState("");

    const [selectedMyActivity, setSelectedMyActivity] = useState('titles');
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const refToScroll = useRef(null);

    // 함수가 실행되면 컴포넌트가 보이게끔 스크롤을 조정합니다.
    const scrollToComponent = () => {
      refToScroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchTitles = async (page) => {
        loggedInAxiosInstance.get(`/member/titles?page=${page}&size=20&sort=createdAt,DESC`).then((res) => {
            setTitles(prevItems => [...prevItems, ...res.data.titles]);
            setIsLast(res.data.isLast);
        }).catch((err) => {
            alert(err.response.data.message);
        })
    };

    const [isLast, setIsLast] = useState(false);
    const pageRef = useScrollPagination(fetchTitles, isLast);
    

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/")
            return;
        }

        loggedInAxiosInstance.get("/member/profile").then((res) => {
            setNickname(res.data.nickname);
            setImgUrl(res.data.imgUrl);
            setEmail(res.data.email);
            setScore(res.data.score);
            setIntroduction(res.data.introduction)
        }).catch((err) => {
            alert(err.response.data.message);
        })

        fetchTitles(0);

    }, [])



    const fetchComments = async (page) => {
        loggedInAxiosInstance.get(`/member/comments?page=${page}&size=10&sort=createdAt,DESC`).then((res) => {
            setComments(res.data.comments);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page + 1)
        }).catch((err) => {
            alert(err.response.data.message);
        })
    };

    const handleMyCommentButton = () => {
        if (comments.length === 0) {
            fetchComments(0);
        }
        setSelectedMyActivity("comments")
    }
    const handleProfileUpdateButton = () => {

            if (!nickname.trim()) {
                alert("닉네임을 입력해주세요.");
                return;
            }

            loggedInAxiosInstance.patch("/member/profile", { nickname : nickname, imgUrl : imgUrl, introduction : introduction})
            .then((response) => {
                // 성공적으로 전송되었을 경우 처리합니다.
                alert("프로필이 수정되었습니다.")
                window.location.reload(true);
            })
            .catch((error) => {
                // 전송 중 오류가 발생한 경우 처리합니다.
                alert(error.response.data.message);
            });
    }
    const handleFileChange = (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        loggedInAxiosInstance.post("/image", formData)
        .then((response) => {
            setImgUrl(response.data.imgUrl)
        })
        .catch((error) => {
            // 전송 중 오류가 발생한 경우 처리합니다.
            alert(error.response.data.message);
        });
    }
    return (
        <Wrapper>
            <Container>
                <ProfileLabel>프로필 정보</ProfileLabel>
                <ProfileUpdateWrapper>
                    <ProfileUpdateContiner>
                        <ProfileImage src={imgUrl || DefaultProfileImage} alt="프로필 이미지" />
                        <label for="file">
                            <UploadButton htmlFor="file">변경</UploadButton>
                        </label>
                        <FileInput id="file" onChange={handleFileChange} />

                        <Label htmlFor="email">이메일</Label>
                        <EmailInput type="text" value={email} readOnly />
                        <br></br>
                        <Label htmlFor="nickname">닉네임</Label>
                        <NicknameInput type="text" value={nickname} onChange={(event) => {setNickname(event.target.value)}} />
                        <br></br>
                        <Label htmlFor="score">점수</Label>
                        <Score>{score}점</Score>
                        <br></br>
                        <Label htmlFor="introduction">자기소개</Label>
                        <TextInputContainer>
                            <TextInput
                                height={100}
                                value={introduction} 
                                onChange={(event) => {
                                    setIntroduction(event.target.value);
                                }}
                                placeholder={`자기소개를 입력해주세요.\n밈 제목 짓기에 1등을 할 경우 화면 상단에 게시됩니다.`}
                            ></TextInput>
                        </TextInputContainer>

                        <Button onClick={handleProfileUpdateButton}>프로필 수정하기</Button>
                    </ProfileUpdateContiner>
                </ProfileUpdateWrapper>


                <span ref={refToScroll}></span>
                <MyActivities>
                    <MyActivityButton onClick={() => setSelectedMyActivity("titles")}>내 제목 보기</MyActivityButton>
                    <MyActivityButton onClick={handleMyCommentButton}>내 댓글 보기</MyActivityButton>
                </MyActivities>

                {selectedMyActivity === 'comments' && 
                    (comments === undefined || comments.length === 0 ? (
                        <></>
                    ) : (
                        <CommentList 
                            comments={comments} 
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={(key) => {
                                fetchComments(key-1)
                                scrollToComponent();
                            }}
                            onClickItem={(item) => {
                                navigate(`/memes/${item.memeId}/titles/${item.titleId}`);
                            }}
                        />
                    ))
                }


                {selectedMyActivity === 'titles' && 
                    (titles === undefined || titles.length === 0 ? (
                        <></>
                    ) : (
                        <>
                        <TitleList 
                            titles={titles} 
                            onClickItem={(item) => {
                                navigate(`/memes/${item.memeId}/titles/${item.id}`);
                            }} 
                        />
                        <div ref={pageRef}></div>
                        </>

                    ))
                }
                

            </Container>
        </Wrapper>
    );
};
export default MyPage;