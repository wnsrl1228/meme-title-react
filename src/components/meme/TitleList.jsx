import React from "react";
import styled from "styled-components";
import TitleListItem from "./TitleListItem";

const Wrapper = styled.div`
    width: 100%;
    max-width: 860px;
    display: grid;
    grid-gap: 32px;
    
    /* 3개, 2개, 1개의 그리드로 조정 */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const TitleList = (props) => {
    const {titles, onClickItem} = props;

    return (
        <Wrapper>
            {titles.map((title, index) => {
                return (
                    <TitleListItem 
                        key={title.id}
                        title={title}
                        onClick={() => {
                            onClickItem(title);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}
export default TitleList;