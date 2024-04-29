import React, { useState } from "react";
import styled from "styled-components";
import formatDateDiff from "../../util/format";
import { useNavigate } from "react-router-dom";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../hooks/AuthProvider";
import { loggedInAxiosInstance } from "../../api/axiosInterceptors";
import DefaultProfileImage from '../../assets/profile_default_640.png'

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    margin-bottom: 16px;
`;

const ContentText = styled.p`
    font-size: 14px;
    margin-left: 46px;
    margin-top: -40px;
    word-wrap: break-word;
`

// 동그란 유저 프로필 스타일드 컴포넌트
const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%; // 원형 모양으로 표시하기 위한 border-radius 설정
  margin-right: 8px; // 프로필 이미지와 닉네임 사이의 간격 조정
  cursor: pointer;
`;

// 유저 닉네임 스타일드 컴포넌트
const Username = styled.span`
  font-size: 14px;
  padding-bottom: 12px;
  font-weight: bold;
  padding-right: 10px;
  cursor: pointer;
`;
const CreatedDate = styled.span`
  font-size: 12px;
  padding-bottom: 12px;
  color: gray;
  padding-right: 12px;
  letter-spacing: -0.5px;
`;
const LikeCount = styled.span`
  font-size: 14px;
  padding-bottom: 10px;
  padding-left: 3px;
`;

const UseWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

// 유저 컨테이너 스타일드 컴포넌트 (프로필 이미지와 닉네임을 나란히 표시하는 컨테이너)
const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center; // 세로 정렬
  padding-top: 2px; // 컨테이너 안의 내용과 경계 사이의 간격 조정
`;

const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const BiLikeCustom = styled(BiLike)`
    font-size: 14px;
    padding-bottom: 10px;
`

const BiLikeButtonCustom = styled(BiLike)`
    font-size: 20px;
    padding-top: 5px;
`

const BiSolidLikeButtonCustom = styled(BiSolidLike)`
    font-size: 20px;
    padding-top: 5px;
`
const RiDeleteBin6LineButtonCustom = styled(RiDeleteBin6Line)`
    font-size: 20px;
    padding-top: 5px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-right: 5px;
`
const LikeButton = styled.button`
    width: 50px;
    padding: 2px 0px;
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
    width: 50px;
    padding: 2px 0px;
    background-color: #ff6347;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #cc4c3d; /* 마우스 커서를 올렸을 때의 색상 */
    }
`;

function CommentListItem(props) {
    const {comment, onClickItem} = props;
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [likeCount, setLikeCount] = useState(comment.likeCount);
    const [isDeleted, setIsDeleted] = useState(false);
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    
    if (isDeleted) {
      return null;
    }

    const handleCommentLike = () => {
      if (isLoggedIn) {
        if (comment.isOwner) {
            alert("본인 댓글에는 좋아요를 할 수 없습니다.");
            return;
        }
        

        if (isLiked) {
            loggedInAxiosInstance.delete(`/comments/${comment.id}/like`)
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
            loggedInAxiosInstance.post(`/comments/${comment.id}/like`)
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
    }

    const handleCommentDelete = () => {
      if (isLoggedIn) {
        if (comment.isOwner === false) {
            alert("잘못된 접근입니다.");
            return;
        }

        loggedInAxiosInstance.delete(`/comments/${comment.id}`)
        .then((res) => {
            alert('댓글을 삭제했습니다.');
            setIsDeleted(true);
        })
        .catch((error) => {
            // 전송 중 오류가 발생한 경우 처리합니다.
            alert(error.response.data.message);
        });
        

      } else {
          navigate("/login");
      }
    }
    return (
      <Wrapper onClick={onClickItem ? () => onClickItem(comment) : undefined}>
        <CommentContainer>
          <UseWrapper>
            <UserContainer>
              <ProfileImage src={comment.member.imgUrl || DefaultProfileImage} alt="Profile" onClick={() => navigate(`/members/${comment.member.id}`)} />
              <Username onClick={() => navigate(`/members/${comment.member.id}`)}>{comment.member.nickname}</Username>
              <CreatedDate>{formatDateDiff(comment.createdAt)}</CreatedDate>
              <BiLikeCustom />
              <LikeCount>{likeCount}</LikeCount>
              <span></span>
            </UserContainer>


            <ButtonContainer>
                <LikeButton onClick={handleCommentLike}>
                    {isLiked === false ? (
                        <BiLikeButtonCustom/>
                    )
                    : (
                        <BiSolidLikeButtonCustom/>
                    )}
                </LikeButton>
            </ButtonContainer>

            {comment.isOwner && (
              <ButtonContainer>
                  <DeleteButton onClick={handleCommentDelete}>
                    <RiDeleteBin6LineButtonCustom/>
                  </DeleteButton>
              </ButtonContainer>
            )}

          </UseWrapper>

          <ContentText>{comment.content}</ContentText>
        </CommentContainer>
      </Wrapper>
    );
}

export default CommentListItem;