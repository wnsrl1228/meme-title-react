import styled from "styled-components";

const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  width: 100%;
  max-width: 860px;
`;

const CategoryButton = styled.button`
  background-color: ${({ active }) => (active ? '#3498db' : '#ecf0f1')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#3498db' : '#dfe6e9')};
  }
`;

const Category = ({ selectedCategory, handleCategoryClick }) => {
    return (
      <CategoryContainer>
        <CategoryButton
          active={selectedCategory === 'createdAt' ? true : false}
          onClick={() => handleCategoryClick('createdAt')}
        >
          최신순
        </CategoryButton>
        <CategoryButton
          active={selectedCategory === 'likeCount' ? true : false}
          onClick={() => handleCategoryClick('likeCount')}
        >
          인기순
        </CategoryButton>
      </CategoryContainer>
    );
  };

  export default Category;