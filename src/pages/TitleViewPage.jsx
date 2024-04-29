import React, { useEffect, useState, useRef } from "react";
import {useNavigate, useParams } from "react-router-dom"; 
import styled from "styled-components";
import CommentList from "../components/comment/CommentList";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/AuthProvider";
import formatDateDiff from "../util/format";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TitleLoading from "../components/common/TitleLoading";
import { guestAxiosInstance, loggedInAxiosInstance } from "../api/axiosInterceptors";
import DefaultProfileImage from '../assets/profile_default_640.png'

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

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    max-width: 420px;
    padding-bottom: 8px;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    text-align: center;
    margin-bottom: 36px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: bold;
    word-wrap: break-word;
    margin-left: 20px;
    margin-right: 20px;
`;


const CommentLabal = styled.p`
    font-size: 20px;
    font-weight: bold;
`
// 이미지를 스타일링할 컴포넌트 정의
const ImageWrapper = styled.div`
  width: inherit; // 너비 설정
  border-radius: 8px;
  text-align: center;
`;

const MemeImage = styled.img`
  width: 100%; // 너비 설정
  height: auto; // 높이 자동 조정
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
    text-align: right;
    
    :hover {
        background: lightgray;
    }
`

// 동그란 유저 프로필 스타일드 컴포넌트
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; // 원형 모양으로 표시하기 위한 border-radius 설정
  margin-right: 10px; // 프로필 이미지와 닉네임 사이의 간격 조정
  margin-left: 5px;
  cursor: pointer;
`;

// 유저 닉네임 스타일드 컴포넌트
const Username = styled.p`
  font-size: 14px;
  cursor: pointer;
`;

// 유저 컨테이너 스타일드 컴포넌트 (프로필 이미지와 닉네임을 나란히 표시하는 컨테이너)
const UserContainer = styled.div`
  display: flex;
  align-items: center; // 세로 정렬
  justify-content: center; // 가로 정렬
  padding: 8px; // 컨테이너 안의 내용과 경계 사이의 간격 조정
`;

const UseWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const CreatedDate = styled.div`
  font-size: 12px;
  color: gray;
  padding-left: 12px;
  letter-spacing: -0.5px;
  padding-top: 1px;
`;
const LikeCount = styled.span`
  font-size: 14px;
  padding-right: 24px;
`;

const BiLikeCustom = styled(BiLike)`
    padding-left: 12px;
    padding-right: 3px;
    padding-top: 1px;
`

const BiLikeButtonCustom = styled(BiLike)`
    font-size: 30px;
    padding-top: 5px;
`

const BiSolidLikeButtonCustom = styled(BiSolidLike)`
    font-size: 30px;
    padding-top: 5px;
`
const LikeButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-right: 10px;
    padding-left: 10px;
`
const LikeButton = styled.button`
    width: 100px;
    padding: 20px 0px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3; /* 마우스 커서를 올렸을 때의 색상 */
    }
`;

const DeleteButton = styled.button`
    width: 100px;
    padding: 20px 0px;
    background-color: #ff6347;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #cc4c3d; /* 마우스 커서를 올렸을 때의 색상 */
    }
`;

const RiDeleteBin6LineButtonCustom = styled(RiDeleteBin6Line)`
    font-size: 30px;
    padding-top: 5px;
`
const ButtonContiner = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`
const BackButtonContainer = styled.div`
    width: 100%;
    max-width: 720px;
`;
const BackButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;
const TitleViewPage = (props) => {
    const navigate = useNavigate();
    const {titleId} = useParams();
    const {memeId} = useParams();
    const [comments, setComments] = useState([]);
    const [title, setTitle] = useState([]);
    const [member, setMember] = useState([]);

    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    const {isLoggedIn, memberInfo} = useAuth();
    const refToScroll = useRef(null);
    const [loading, setLoading] = useState(true);
    // 함수가 실행되면 컴포넌트가 보이게끔 스크롤을 조정합니다.
    const scrollToComponent = () => {
      refToScroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchComments = async (page) => {
        const axiosInstance = isLoggedIn ? loggedInAxiosInstance : guestAxiosInstance;
        try{
            const url = `/titles/${titleId}/comments?page=${page}&size=10&sort=createdAt,DESC`;
            const res = await axiosInstance.get(url);
            setComments(res.data.comments);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page + 1)
        } catch (err){
            alert(err);
        }
    };

    const handleCommentCreate = (event) => {

        if (isLoggedIn) {
            if (!comment.trim()) {
                alert("댓글을 입력해주세요.");
                return;
            }

            loggedInAxiosInstance.post(`/titles/${titleId}/comments`, { content : comment })
            .then((response) => {
                alert('댓글이 작성되었습니다.');
                setComment("");
                fetchComments(0);
            }).catch((err) => {
                // 전송 중 오류가 발생한 경우 처리합니다.
                alert(err.response.data.message);
            })
        } else {
            navigate("/login");
        }
    }

    const handleTitleLike = () => {
        if (isLoggedIn) {
            if (title.isOwner) {
                alert("본인 글에는 좋아요를 할 수 없습니다.");
                return;
            }

            if (isLiked) {
                loggedInAxiosInstance.delete(`/titles/${titleId}/like`)
                .then((res) => {
                    setIsLiked(false);
                    setLikeCount(likeCount-1);
                    alert('좋아요를 취소했습니다.');
                })
                .catch((error) => {
                    // 전송 중 오류가 발생한 경우 처리합니다.
                    alert(error.response.data.message);
                });
            } else {
                loggedInAxiosInstance.post(`/titles/${titleId}/like`)
                .then((res) => {
                    setIsLiked(true);
                    setLikeCount(likeCount+1);
                    alert('좋아요를 눌렀습니다.');
                })
                .catch((error) => {
                    // 전송 중 오류가 발생한 경우 처리합니다.
                    alert(error.response.data.message);
                });
            }

        } else {
            navigate("/login");
        }
    };

    const handleTitleDelete = () => {
        if (isLoggedIn) {
            if (title.isOwner === false) {
                alert("잘못된 접근입니다.");
                return;
            }
            
            loggedInAxiosInstance.delete(`/titles/${titleId}`)
            .then((res) => {
                alert('제목을 삭제했습니다.');
                window.history.back();
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

        const axiosInstance = isLoggedIn ? loggedInAxiosInstance : guestAxiosInstance;

        axiosInstance.get(`/titles/${titleId}`)
          .then((res) => {
            setTitle(res.data);
            setMember(res.data.member);
            setIsLiked(res.data.isLiked);
            setLikeCount(res.data.likeCount);
            setLoading(false);
          })
          .catch((error) => {
            // 전송 중 오류가 발생한 경우 처리합니다.
            alert(error.response.data.message);
            navigate(-1)
          });

        fetchComments(0)
    }, [])


    return (
        <Wrapper>

            
            {loading === true ? (
                <TitleLoading/>
            ) : (
                <TitleContainer>
                    <UseWrapper>
                        <UserContainer>
                            <ProfileImage src={member.imgUrl || DefaultProfileImage} alt="Profile" onClick={() => {navigate(`/members/${member.id}`)}} />
                            <Username onClick={() => {navigate(`/members/${member.id}`)}}>{member.nickname}</Username>
                            <CreatedDate>{formatDateDiff(title.createdAt)}</CreatedDate>
                            <BiLikeCustom />
                            <LikeCount>{likeCount}</LikeCount>
                        </UserContainer>
                    </UseWrapper>

                    <ImageWrapper>
                        <MemeImage src={title.imgUrl} alt="밈 이미지" />
                    </ImageWrapper>
                    <TitleText>{title.title}</TitleText>
                </TitleContainer>
            )}

            <Container>

                <ButtonContiner>
                    <LikeButtonContainer>
                        <LikeButton onClick={handleTitleLike}>
                            좋아요<br />
                            {isLiked === false ? (
                                <BiLikeButtonCustom/>
                            )
                            : (
                                <BiSolidLikeButtonCustom/>
                            )}
                            </LikeButton>
                    </LikeButtonContainer>
                    {title.isOwner && (
                    <LikeButtonContainer>
                        <DeleteButton onClick={handleTitleDelete}>
                            삭제<br />
                            <RiDeleteBin6LineButtonCustom/>
                        </DeleteButton>
                    </LikeButtonContainer>
                    )}
                    <span></span>
                </ButtonContiner>


                <CommentLabal>댓글</CommentLabal>
                <span ref={refToScroll}></span>
                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                    placeholder="댓글을 입력해주세요."
                />


                <ButtonContainer>
                    <Button
                        title="댓글 작성하기"
                        onClick={handleCommentCreate}
                    />
                </ButtonContainer>

                
                <CommentList 
                    comments={comments} 
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(key) => {
                        fetchComments(key-1)
                        scrollToComponent();
                    }}
                />

            </Container>
            <BackButtonContainer>
                <BackButton onClick={() => {navigate(`/memes/${memeId}`)}}>뒤로가기</BackButton>
            </BackButtonContainer>
        </Wrapper>
    )
}
export default TitleViewPage;