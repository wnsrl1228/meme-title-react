import styled from 'styled-components';

// 페이징 버튼을 담는 컨테이너
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// 페이징 버튼 스타일
export const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#f0f0f0')};
    color: ${({ active }) => (active ? '#fff' : '#000')};
  }
`;

