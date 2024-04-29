import React from "react";
import styled from "styled-components";
import TopTitleListItem from "./TopTitleListItem";

const Wrapper = styled.div`
    width: 100%; 
    max-width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 32px;
    
    /* 3개, 2개, 1개의 그리드로 조정 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    place-items: center;
`;

const ContainerTwo = styled.div`
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RankLabel = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 15px;
  background-color: #f39c12;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
  margin-bottom: 12px;
`;

const FirstPlaceLabel = styled(RankLabel)`
  background-color: #f39c12;
`;

const SecondPlaceLabel = styled(RankLabel)`
  background-color: #3498db;
`;

const ThirdPlaceLabel = styled(RankLabel)`
  background-color: #2ecc71;
`;
const TopTitleList = (props) => {
    const {titles, onClickItem} = props;

    return (
        <>
        {titles === undefined || titles.length === 0 ? (
            <></>
        ) : (
            <Wrapper>
                <FirstPlaceLabel>1등</FirstPlaceLabel>
                <TopTitleListItem title={titles[0]} onClick={onClickItem}/>
                <Container>
                        {titles.length > 1 && (
                            <ContainerTwo>
                                <SecondPlaceLabel>2등</SecondPlaceLabel>
                                <TopTitleListItem title={titles[1]} onClick={onClickItem} />
                            </ContainerTwo>

                        )}
                        {titles.length > 2 && (
                            <ContainerTwo>
                                <ThirdPlaceLabel>3등</ThirdPlaceLabel>
                                <TopTitleListItem title={titles[2]} onClick={onClickItem} />
                            </ContainerTwo>
                            
                        )}
                </Container>
                
            </Wrapper>
        )}
        </>
    );
}
export default TopTitleList;