import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Button from "../components/common/Button";
import { useAuth } from "../hooks/AuthProvider";
import TopTitleList from "../components/meme/ToptitleList";
import TitleList from "../components/meme/TitleList";
import useScrollPagination from "../hooks/useScrollPagination";
import TitleListLoading from "../components/common/TitleListLoading";
import Category from "../components/common/Category";
import { guestAxiosInstance } from "../api/axiosInterceptors";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const ButtonContainer = styled.div`
    width: 100%;
    max-width: 860px;
    margin: 20px;
    text-align: right;
    padding-right: 10px;
    :hover {
        background: lightgray;
    }
`
const StyledDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 100px 100px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const MemeViewPage = (props) => {

    const {memeId} = useParams();
    const [titles, setTitles] = useState([]);
    const [topTitles, setTopTitles] = useState([]);
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('createdAt'); // 최신순이 기본 선택됨
    const location  = useLocation();
    const [isInProgress, setIsInProgress] = useState(false);
    const [loading, setLoading] = useState(true);
    const [topTitlesError, setTopTitlesError] = useState(false);
    const fetchTitles = async (page, sort) => {
        try{
            const url = `/memes/${memeId}/titles?page=${page}&size=20&sort=${sort},DESC`;
            const res = await guestAxiosInstance.get(url);
            setTitles(prevItems => [...prevItems, ...res.data.titles]);
            setIsLast(res.data.isLast);
            setLoading(false);
        } catch (err){
            alert(err.response.data.message);
            navigate("/")
        }
    };

    const [isLast, setIsLast] = useState(false);
    const pageRef = useScrollPagination(fetchTitles, isLast, selectedCategory);

    const handleCategoryClick = (category) => {
        if (category !== selectedCategory) {
          setSelectedCategory(category);
          setLoading(true);
          // 선택한 카테고리에 따라 API 호출 또는 다른 작업 수행
        }
      };

    useEffect(() => {
        
        if (location.state !== null) {
            setIsInProgress(location.state.isInProgress);
        }

        if (isInProgress === false) {
            guestAxiosInstance.get(`/memes/${memeId}/top`).then((res) => {
                setTopTitles(res.data.titles);
            }).catch((err) => {
                setTopTitlesError(true)
                alert(err.response.data.message);
                navigate("/")
            });
        }
    }, [isInProgress, memeId, navigate, location.state])

    useEffect(() => {
        if (topTitlesError === false) {
            guestAxiosInstance.get(`/memes/${memeId}/titles?page=0&size=20&sort=${selectedCategory},DESC`).then((res) => {
                setTitles(res.data.titles);
                setIsLast(res.data.isLast);
                setLoading(false);
            }).catch((err) => {
                alert(err.response.data.message);
                navigate("/")
            });
        }

    }, [topTitlesError, memeId, navigate, selectedCategory])

    return (
        <Wrapper>
            {isInProgress === false && (
                <>
                    {topTitles === undefined || topTitles.length === 0 ? (
                        <></>
                    ) : (
                        <TopTitleList
                            titles={topTitles} 
                            onClickItem={(item) => {
                                navigate(`/memes/${memeId}/titles/${item.id}`);
                            }
                        }></TopTitleList>
                    )}
                </>
            )}
            <br></br>
            
            <ButtonContainer>
                <Button onClick={ () => {
                    if (isLoggedIn) {
                        navigate(`/memes/${memeId}/titles/create`)
                    } else {
                        navigate("/login");
                    }
                }} 
                title="밈 제목 짓기"
                />
            </ButtonContainer>
            
            <Category
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
            />

            {loading === true ? (
                <TitleListLoading/>
            ) : (
                titles === undefined || titles.length === 0 ? (
                    <StyledDiv>첫 번째 제목을 지어주세요.</StyledDiv>
                ) : (
                    <>
                        <TitleList 
                            titles={titles} 
                            onClickItem={(item) => {
                                navigate(`/memes/${memeId}/titles/${item.id}`);
                            }} />
                        <div ref={pageRef}></div>
                    </>

                    )
            )}

            {pageRef.loading && <></>}
        </Wrapper>
    );
}
export default MemeViewPage;