import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

import Pagination from "../common/Pagination";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 24px;
    margin-top: 24px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props) {
    const {comments, totalPages, currentPage, onPageChange, onClickItem} = props;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
        <div>
            <Wrapper>
                {comments === undefined || comments.length === 0 ? (
                    <div></div>
                ) : (
                    comments.map((comment, index) => {
                        return (
                            onClickItem === undefined ? (
                                <CommentListItem 
                                    key={comment.id}
                                    comment={comment}
                                />
                            ) : (
                                <CommentListItem 
                                key={comment.id}
                                comment={comment}
                                onClickItem={() => {
                                    onClickItem(comment);
                                }}
                            />
                            )
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
export default CommentList;