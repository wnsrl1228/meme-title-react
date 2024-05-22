import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleList from "../components/meme/TitleList";
import { useNavigate, useParams } from "react-router-dom";
import { guestAxiosInstance } from "../api/axiosInterceptors";
import TextInput from "../components/common/TextInput";
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

const Score = styled.span`
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;

`;

const ProfileLabel = styled.p`
    font-size: 24px;
    font-weight: bold;
`
const Label = styled.label`
  margin-bottom: 3px;
  display: block;
  font-size: 14px;
`;

const TextInputContainer = styled.div`
    width: 80%;
    padding-bottom: 20px;
`
const ProfilePage = (props) => {

    const [titles, setTitles] = useState([]);

    const {memberId} = useParams();

    const [nickname, setNickname] = useState("");
    const [imgUrl, setImgUrl] = useState(null);
    const [score, setScore] = useState("");
    const [introduction, setIntroduction] = useState("");

    const navigate = useNavigate();



    useEffect(() => {


        guestAxiosInstance.get(`/member/profile/${memberId}`).then((res) => {
            setNickname(res.data.nickname);
            setImgUrl(res.data.imgUrl);
            setScore(res.data.score);
            setIntroduction(res.data.introduction);
        }).catch((err) => {
            alert(err.response.data.message);
            navigate(-1)
        })

        guestAxiosInstance.get(`/member/${memberId}/titles?page=0&size=20&sort=createdAt,DESC`).then((res) => {
            setTitles(res.data.titles);
        }).catch((err) => {
            alert(err.response.data.message);
        })

    }, [memberId, navigate])



    return (
        <Wrapper>
            <Container>
                <ProfileLabel>프로필 정보</ProfileLabel>
                <ProfileUpdateWrapper>
                    <ProfileUpdateContiner>
                        <ProfileImage src={imgUrl || DefaultProfileImage} alt="프로필 이미지" />
                        <Label htmlFor="nickname">닉네임</Label>
                        <NicknameInput type="text" value={nickname} readonly disabled />
                        <br></br>
                        <Label htmlFor="score">점수</Label>
                        <Score>{score}점</Score>
                        <br></br>
                        <Label htmlFor="introduction">자기소개</Label>
                        <TextInputContainer>
                            <TextInput
                                height={100}
                                value={introduction} disabled={true}></TextInput>
                        </TextInputContainer>
                    </ProfileUpdateContiner>
                </ProfileUpdateWrapper>


                <MyActivities>
                    <MyActivityButton>제목 목록</MyActivityButton>
                </MyActivities>


                {titles === undefined || titles.length === 0 ? (
                    <></>
                ) : (
                    <TitleList 
                        titles={titles} 
                        onClickItem={(item) => {
                            navigate(`/memes/${item.memeId}/titles/${item.id}`);
                        }} 
                    />
                )}
                


            </Container>
        </Wrapper>
    );
};


export default ProfilePage;
