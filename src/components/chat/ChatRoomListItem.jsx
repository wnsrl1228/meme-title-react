import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100%);
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgray;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
    padding-left: 10px;
    padding-right: 10px;
`

const ChatRoomListItem = (props) => {

    const {chatRoom, onClick} = props;

    return (
        <Wrapper onClick={() => {onClick(chatRoom)}}>

            <TitleText>{chatRoom.name}</TitleText>
        </Wrapper>
    )
}

export default ChatRoomListItem;