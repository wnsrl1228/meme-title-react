import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChatRoomList from "../components/chat/ChatRoomList";
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

const ChatRoomsPage = (props) => {
    
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        guestAxiosInstance.get(`/chat/rooms`).then((res) => {
            setChatRooms(res.data.chatRooms);
            setLoading(false)
        }).catch((err) => {
            alert(err.response.data.message);
            navigate(-1)
        })
    }, [])
    return (
        <Wrapper>  
            {loading === true ? (
                <TitleListLoading/>
            ) : (
                <ChatRoomList 
                    chatRooms={chatRooms} 
                    onClickItem={(item) => {
                        navigate(`/chat/rooms/${item.id}`);
                }} />
            )}
        </Wrapper>
    );
}
export default ChatRoomsPage;