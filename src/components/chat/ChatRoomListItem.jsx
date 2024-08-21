import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100%);
    padding: 0px;
    display: flex;
    flex-direction: column;
    border: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* 흐릿한 테두리 효과 */
    border-radius: 8px;
    cursor: pointer;
    background: white;

    :hover {
        background: lightgray
    }
`;

const TitleTextWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const TitleText = styled.p`
    font-size: 20px;
`

const CountTextWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 15px;
    pointer-events: none;
`
const CountText = styled.p`
    font-size: 20px;
`
const ChatRoomListItem = (props) => {

    const {chatRoom, onClick} = props;

    return (
        <Wrapper onClick={() => {onClick(chatRoom)}}>

            <TitleTextWrapper>
                <TitleText>{chatRoom.name}</TitleText>
            </TitleTextWrapper>
            <CountTextWrapper>
                <CountText>{chatRoom.memberCount}/{chatRoom.maxCapacity}</CountText>
            </CountTextWrapper>
            
            
        </Wrapper>
    )
}

export default ChatRoomListItem;