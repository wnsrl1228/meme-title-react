import { BiLike } from "react-icons/bi";
import styled from "styled-components";
import formatDateDiff from "../../util/format";
import DefaultProfileImage from '../../assets/profile_default_640.png'

const TitleContainer = styled.div`
    width: 100%;
    max-width: 300px;
    padding-bottom: 8px;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    text-align: center;
    margin-bottom: 36px;
`;


// 동그란 유저 프로필 스타일드 컴포넌트
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%; // 원형 모양으로 표시하기 위한 border-radius 설정
  margin-right: 10px; // 프로필 이미지와 닉네임 사이의 간격 조정
`;

// 유저 닉네임 스타일드 컴포넌트
const Username = styled.span`
  font-size: 16px;
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

const TitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    word-wrap: break-word;
    margin-left: 20px;
    margin-right: 20px;
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

const LikeCount = styled.span`
  font-size: 14px;
  padding-right: 24px;
`;

const BiLikeCustom = styled(BiLike)`
    padding-left: 12px;
    padding-right: 3px;
    padding-top: 1px;
`
const CreatedDate = styled.div`
  font-size: 12px;
  color: gray;
  padding-left: 12px;
  letter-spacing: -0.5px;
  padding-top: 1px;
`;
const TopTitleListItem = (props) => {

    const {title, onClick} = props;

    return (
        <TitleContainer onClick={() => {onClick(title)}}>
            <UseWrapper>
              <UserContainer>
                    <ProfileImage src={title.member.imgUrl || DefaultProfileImage} alt="Profile" />
                    <Username>{title.member.nickname}</Username>
                    <CreatedDate>{formatDateDiff(title.createdAt)}</CreatedDate>
                    <BiLikeCustom/>
                    <LikeCount>{title.likeCount}</LikeCount>
                </UserContainer>
            </UseWrapper>

            <ImageWrapper>
                <MemeImage src={title.imgUrl} alt="밈 이미지" />
            </ImageWrapper>
            <TitleText>{title.title}</TitleText>
        </TitleContainer>
    );
};

export default TopTitleListItem;