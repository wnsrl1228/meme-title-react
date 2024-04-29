import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/AuthProvider';
import { guestAxiosInstance, loggedInAxiosInstance } from '../../api/axiosInterceptors';
import DefaultProfileImage from '../../assets/profile_default_640.png'

const Wrapper = styled.div`
    padding-top: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: right;
`;

const Container = styled.div`
    width: 100%;
    max-width: 860px;
`;
const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  padding: 10px 20px; /* 내부 여백 */
  text-align: center;
  justify-content: center;
  margin: 10px 0px;
`;

// Styled-components를 사용하여 스타일링된 버튼 생성
const LoginButton = styled.button`
  padding: 4px 20px; /* 내부 여백 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 테두리 반경 */
  cursor: pointer; /* 커서 스타일 */
  margin-right: 5px;
  &:hover {
    background-color: gray; /* 마우스 오버시 배경색 변경 */
  }
`;


// 네비게이션 바 컨테이너
const TopContainer = styled.nav`
  width: 100%;
  background-color: wheat; /* 네비게이션 바 배경색 *//* 텍스트 색상 */
  color: black;
  padding: 10px 20px; /* 내부 여백 */
  text-align: center;
  justify-content: center;
`;

const ContentText = styled.p`
    font-size: 20px;
    font-weight: 500;
    word-wrap: break-word;
`
const WriterText = styled.p`
    font-size: 14px;
`

const NavbarContainer = styled.nav`
  color: black; /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  display: flex; /* 플렉스 박스로 설정 */
  justify-content: space-between;
`;

const MenuList = styled.ul`
  list-style-type: none; /* 리스트 스타일 제거 */
  margin: 0; /* 마진 제거 */
  padding: 0; /* 내부 여백 제거 */
  display: flex; /* 플렉스 박스로 설정 */
`;

const MenuItem = styled.li`
  margin-right: 20px; /* 메뉴 아이템 간격 */
`;

// 네비게이션 메뉴 링크 스타일링
const MenuLink = styled.a`
  color: black; /* 링크 텍스트 색상 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    text-decoration: underline; /* 호버시 밑줄 표시 */
  }
`;

const Ranking = styled.a`
  color: black; /* 링크 텍스트 색상 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    text-decoration: underline; /* 호버시 밑줄 표시 */
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  place-content: 10px;
`
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%; // 원형 모양으로 표시하기 위한 border-radius 설정
  margin-right: 10px; // 프로필 이미지와 닉네임 사이의 간격 조정
`;

// 유저 닉네임 스타일드 컴포넌트
const Username = styled.span`
  font-size: 14px;
`;
const UserContainer = styled.a`
  display: flex;
  align-items: center; // 세로 정렬
  justify-content: center; // 가로 정렬
  padding: 8px; // 컨테이너 안의 내용과 경계 사이의 간격 조정
  cursor: pointer; /* 커서 스타일 */
  padding: 4px 20px; /* 내부 여백 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 테두리 반경 */
  margin-right: 5px;
  background-color: white;
  &:hover {
    background-color: gainsboro; /* 마우스 오버시 배경색 변경 */
  }
`;


const Navbar = () => {

  const navigate = useNavigate();
  const { isLoggedIn, logout, updateMemberInfo, memberInfo } = useAuth();
  const [nickname, setNickname] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const [topMemberNickname, setTopMemberNickname] = useState("작성자");
  const [topMemberIntroduction, setTopMemberIntroduction] = useState("1등 유저의 자기소개입니다.");
  const handleLogout = () => {
    loggedInAxiosInstance.delete("/logout")
    .then(() => {
      localStorage.removeItem("ACCESS_TOKEN")
      logout();
      updateMemberInfo(-1);
      navigate('/');
    }).catch((error) => {
      localStorage.removeItem("ACCESS_TOKEN")
      logout();
      navigate('/');
      alert(error.message)
    });
  };

  useEffect(() => {
    if (isLoggedIn) {

      loggedInAxiosInstance.get(`/member/profile`)
      .then((res) => {
          // 성공적으로 전송되었을 경우 처리합니다.
          setNickname(res.data.nickname);
          setImgUrl(res.data.imgUrl);
          updateMemberInfo(res.data.memberId);
      }).catch((err) => {
          // 전송 중 오류가 발생한 경우 처리합니다.
          alert(err.response.data.message);
      });

      guestAxiosInstance.get("/top/introduction")
      .then((res) => {
        // 성공적으로 전송되었을 경우 처리합니다.
        setTopMemberNickname(res.data.nickname);
        setTopMemberIntroduction(res.data.introduction);
      }).catch((err) => {
          // 전송 중 오류가 발생한 경우 처리합니다.
          alert(err.response.data.message);
      });
      console.log(memberInfo)
  } 
  }, [isLoggedIn]);

  return (
    <Wrapper>
        <Container>
            {isLoggedIn ? (
              <ProfileContainer>
                <UserContainer onClick={() => {navigate("/member/mypage")}}>
                    <ProfileImage src={imgUrl || DefaultProfileImage} alt="Profile"></ProfileImage>
                    <Username>{nickname}</Username>
                </UserContainer>
                <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
              </ProfileContainer>
            ) : (
              <LoginButton onClick={() => {navigate("/login")}}>로그인</LoginButton>
            )}
            
            <MainTitleText>
              <MenuLink onClick={() => navigate("/")}>짤 제목</MenuLink>
            </MainTitleText>
            <TopContainer>
                <ContentText>"{topMemberIntroduction}"</ContentText>
                <WriterText>- {topMemberNickname} -</WriterText>
            </TopContainer>
            <NavbarContainer>
                <MenuList>
                    <MenuItem><MenuLink onClick={() => navigate("/")}>홈</MenuLink></MenuItem>
                    <MenuItem><MenuLink onClick={() => navigate("/ranking")}>순위</MenuLink></MenuItem>
                    {memberInfo === 1 && <MenuLink onClick={() => navigate("/meme/create")}>밈 생성</MenuLink>}
                </MenuList>
            </NavbarContainer>
        </Container>
    </Wrapper>
    

  );
};

export default Navbar;