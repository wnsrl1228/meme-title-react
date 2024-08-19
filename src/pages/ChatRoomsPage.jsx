import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChatRoomList from "../components/chat/ChatRoomList";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ChatRoomsPage = (props) => {
    const navigate = useNavigate();
    // 임시 데이터
    const chatRooms = [
        { id: 1, name: 'Chat Room 1' },
        { id: 2, name: 'Chat Room 2' },
        { id: 3, name: 'Chat Room 3' },
        ];
    return (
        <Wrapper>
            <ChatRoomList 
                chatRooms={chatRooms} 
                onClickItem={(item) => {
                    navigate(`/chat/rooms/${item.id}`);
                }} />
        </Wrapper>
    );
}
export default ChatRoomsPage;