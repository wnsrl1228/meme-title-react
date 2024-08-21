import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Stomp } from "@stomp/stompjs";
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
  max-width: 680px;
  height: 600px;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  border-radius: 5px; /* 둥근 모서리 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  padding: 12px;
`;
// 채팅 메시지 목록
const MessageList = styled.div`
  flex: 1; /* 메시지 리스트가 컨테이너에서 가능한 모든 공간을 차지하도록 설정 */
  padding: 20px;
  overflow-y: auto; /* 세로 스크롤 가능하게 설정 */
  /* background-color: wheat; */
  border-radius: 5px;
  margin: 15px 0px;
`;

// 메시지 컨테이너
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* background-color: red; */
  margin-bottom: 10px;
  width: 100%;
  
`;
const MessageAndTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 5px;
  width: 100%;
`;
// 사용자 이름 스타일
const Username = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

// 개별 메시지 스타일
const Message = styled.div`
  font-size: 14px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word; /* 긴 단어가 줄바꿈되도록 설정 */
  overflow-wrap: break-word; /* 긴 단어가 줄바꿈되도록 설정 */
  margin-right: 6px;
  max-width: 480px;
  min-width: 200px;
`;

// 날짜 스타일
const Timestamp = styled.div`
  font-size: 12px;
  color: gray; 
  align-self: flex-end; /* 부모 요소의 하단에 맞추기 */

`;

// 채팅 입력 폼
const InputForm = styled.div`
  display: flex;
  padding: 10px;
`;

// 입력 필드
const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
`;

// 보내기 버튼
const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButtonContainer = styled.div`
    width: 100%;
    max-width: 720px;
`;

const BackButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: "GmarketSans";
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ChatViewPage = () => {
    const {roomId} = useParams();
    const stompClient = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // 웹 소켓 연결 설정
    const connect = () => {
      //웹소켓 연결
        const socket = new WebSocket("ws://localhost:8080/ws");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
        //메시지 수신(1은 roomId를 임시로 표현)
          stompClient.current.subscribe(`/sub/chat/${roomId}/messages`, (message) => {
              //누군가 발송했던 메시지를 리스트에 추가
              console.log(`${message} 메세지이다.`)
              const newMessage = JSON.parse(message.body).body;
              setMessages(prevMessages => [...prevMessages, newMessage]);
            });
        });
      };

    // 웹소켓 연결 해제
    const disconnect = () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
    
    //메세지 전송
    const sendMessage = () => {
      if (stompClient.current && inputValue) {
        const body = {
          nickname : "테스트1",
          message : inputValue
        };
        stompClient.current.send(`/pub/chat/${roomId}/message`, {}, JSON.stringify(body));
        setInputValue('');
      }
    };

    useEffect(() => {
      connect();
      // 컴포넌트 언마운트 시 웹소켓 연결 해제
      return () => disconnect();
    }, []);

    return (
        <Wrapper>
            <Container>
                
                <BackButtonContainer>
                    <BackButton>뒤로가기</BackButton>
                </BackButtonContainer>
                <MessageList>
                    {messages.map((msg, index) => (
                        <MessageWrapper key={index}>
                            <Username>{msg.nickname}</Username>
                            <MessageAndTimeWrapper>
                                <Message>                                
                                    {msg.message}
                                    
                                </Message>
                                <Timestamp>임시날짜</Timestamp>
                            </MessageAndTimeWrapper>

                        </MessageWrapper>
                    ))}
                </MessageList>
                <InputForm>
                    <InputField 
                        type="text" 
                        value={inputValue}
                        onChange={(event) => {
                          setInputValue(event.target.value);
                        }}
                        placeholder="내용을 입력해주세요." />
                    <SendButton onClick={sendMessage}>보내기</SendButton>
                </InputForm>

            </Container>
        </Wrapper>
    )
}
export default ChatViewPage;