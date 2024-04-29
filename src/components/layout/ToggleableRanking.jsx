import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일링된 토글 버튼 생성
const ToggleButton = styled.button`
  background-color: #007bff; /* 버튼 배경색 */
  color: #fff; /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 테두리 반경 */
  cursor: pointer; /* 커서 스타일 */
  margin-bottom: 10px; /* 아래쪽 여백 */
`;

// 랭킹 목록 컨테이너
const RankingListContainer = styled.div`
  margin-top: 10px; /* 위쪽 여백 */
`;

// 랭킹 아이템
const RankingItem = styled.div`
  margin-bottom: 5px; /* 아래쪽 여백 */
`;

const ToggleableRanking = ({ rankings }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <ToggleButton onClick={() => setIsToggled(!isToggled)}>
        {isToggled ? '접기' : '펼치기'}
      </ToggleButton>
      {isToggled && (
        <RankingListContainer>
          {rankings.map((ranking, index) => (
            <RankingItem key={index}>
              {index + 1}. {ranking}
            </RankingItem>
          ))}
        </RankingListContainer>
      )}
    </div>
  );
};

export default ToggleableRanking;