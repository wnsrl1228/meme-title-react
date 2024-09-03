import React from "react";
import styled from "styled-components";
import ChatRoomListItem from "./ChatRoomListItem";

const Wrapper = styled.div`
    width: 100%;
    max-width: 860px;
    display: grid;
    grid-gap: 32px;
    height: 200px;
    
    /* 3개, 2개, 1개의 그리드로 조정 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const ChatRoomList = (props) => {
    const {chatRooms, onClickItem} = props;

    return (
        <Wrapper>
            {chatRooms.map((chatRoom, index) => {
                return (
                    <ChatRoomListItem 
                        key={chatRoom.id}
                        chatRoom={chatRoom}
                        onClick={() => {
                            onClickItem(chatRoom);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}
export default ChatRoomList;