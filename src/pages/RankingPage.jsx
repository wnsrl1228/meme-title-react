import styled from "styled-components";
import RankingList from "../components/ranking/RankingList";
import { useEffect, useRef, useState } from "react";
import { guestAxiosInstance } from "../api/axiosInterceptors";

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
    margin-top: 50px;
`;

const RankingPage = () => {

    const [rankings, setRankings] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const refToScroll = useRef(null);

    // 함수가 실행되면 컴포넌트가 보이게끔 스크롤을 조정합니다.
    const scrollToComponent = () => {
      refToScroll.current.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchRankings = async (page) => {
        try{
            const url = `/members/ranking?page=${page}&size=20&sort=score,DESC`;
            const res = await guestAxiosInstance.get(url);
            setRankings(res.data.ranks);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page + 1);
        } catch (err){
            alert(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchRankings(0);
    }, [])
    return (
        <Wrapper>
            <Container>
                <span ref={refToScroll}></span>
                <RankingList
                    rankings={rankings}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(key) => {
                        fetchRankings(key-1)
                        scrollToComponent();
                    }}
                />
            </Container>
        </Wrapper>
    )
};

export default RankingPage;