import React from "react";
import styled from "styled-components";

import Pagination from "../common/Pagination";
import RankingListItem from "./RankingListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 24px;
    margin-top: 24px;
`;

const RankingList = (props) => {
    const {rankings, totalPages, currentPage, onPageChange} = props;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
        <div>
            <Wrapper>
                {rankings === undefined || rankings.length === 0 ? (
                    <div></div>
                ) : (
                    rankings.map((ranking, index) => {
                        return (
                        <RankingListItem 
                            key={ranking.rank}
                            ranking={ranking}
                        />
                        );
                    })
                )}

            </Wrapper>
            <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>

    );
}
export default RankingList;