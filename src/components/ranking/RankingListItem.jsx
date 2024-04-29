import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultProfileImage from '../../assets/profile_default_640.png'

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;

    cursor: pointer; /* 커서 스타일 */
    border: none; /* 테두리 없음 */
    margin-right: 5px;
    border-bottom: 1px solid gainsboro;
    background-color: white;
    &:hover {
        background-color: gainsboro; /* 마우스 오버시 배경색 변경 */
    }
`;


// 동그란 유저 프로필 스타일드 컴포넌트
const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%; // 원형 모양으로 표시하기 위한 border-radius 설정
  margin: auto;
`;

// 유저 닉네임 스타일드 컴포넌트
const Username = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding-left: 8px;
`;

const LikeCount = styled.div`
  font-size: 24px;
  font-weight: bold;

`;
// 유저 컨테이너 스타일드 컴포넌트 (프로필 이미지와 닉네임을 나란히 표시하는 컨테이너)
const RankningContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding-top: 2px; // 컨테이너 안의 내용과 경계 사이의 간격 조정
`;

const Container = styled.div`
    width: 100%;

`

const Rank = styled.div`
    width: 50px;
    font-size: 18px;
    font-weight: bold;
    padding-right: 20px;
    
`
const UserContainer = styled.a`
  display: flex;
  align-items: center; // 세로 정렬
  justify-content: center; // 가로 정렬

`;
const RankingListItem = (props) => {
    const {ranking} = props;
    const navigate = useNavigate();
    
    return (
        <Wrapper onClick={() => {navigate(`/members/${ranking.member.id}`)}}>
            <Container>
                <RankningContainer>
                    <UserContainer >
                        <Rank>{ranking.rank}등</Rank>
                        <ProfileImage src={ranking.member.imgUrl || DefaultProfileImage} alt="Profile"></ProfileImage>
                        <Username>{ranking.member.nickname}</Username>
                    </UserContainer>
                    <LikeCount>{ranking.score}점</LikeCount>
                </RankningContainer>
            </Container>

        </Wrapper>
    );
}

export default RankingListItem;