import styled from "styled-components";
import {useNavigate} from "react-router-dom"
import MemeList from "../components/meme/MemeList";
import { useEffect, useState } from "react";
import TitleListLoading from "../components/common/TitleListLoading";
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
    max-width: 420px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const MainPage = () => {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemes = async () => {
            try{
                const url = "/memes";
                const res = await guestAxiosInstance.get(url);
                setMemes(res.data.memes);
                setLoading(false)
            } catch (err){
                alert(err.response.data.message);
            }
            
        };
        fetchMemes();
    }, [])
    return (
        <Wrapper>
            <Container>
                {loading === true ? (
                    <TitleListLoading/>
                ) : (
                    <MemeList
                        memes={memes}
                        onClickItem={(item) => {
                            navigate(`/memes/${item.id}`, {state: {isInProgress : item.isInProgress}});
                        }}
                    />
                )}

                
            </Container>
        </Wrapper>
    )
}
export default MainPage;