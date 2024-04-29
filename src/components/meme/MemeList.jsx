import React from "react";
import styled from "styled-components";
import MemeListItem from "./MemeListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    :hover {
        background: lightgray;
    }
`;

function MemeList(props) {
    const {memes, onClickItem} = props;

    return (
        <Wrapper>
            {memes.length === 0 ? (
                <div>데이터를 가져올 수 없습니다.</div>
            ) : (
                memes.map((meme, index) => (
                    <MemeListItem 
                        key={meme.id}
                        meme={meme}
                        onClick={() => {
                            onClickItem(meme);
                        }}
                    />
                ))
            )}
        </Wrapper>
    );
}
export default MemeList;