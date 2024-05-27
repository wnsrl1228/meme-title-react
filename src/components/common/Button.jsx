import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-family: "GmarketSans";
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3; /* 마우스 커서를 올렸을 때의 색상 */
    }
`
const Button = ({title, onClick}) => {
    return (
        <StyledButton onClick={onClick}>{title || "버튼"}</StyledButton>
    );
};

export default Button;