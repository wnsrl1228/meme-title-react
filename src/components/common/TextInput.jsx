import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: calc(100% - 32px);
    ${(props) =>
        props.height &&
        `
        height: ${props.height}px;
        `
    }
    padding: 16px;
    font-size:16px;
    line-height:20px;
    opacity: 70%;
    border: 1px solid gainsboro;
`;

const TextInput = ({ height, value, onChange, placeholder, disabled=false}) => {
    return (
        <StyledTextarea height={height} value={value} onChange={onChange} placeholder={placeholder}  disabled={disabled ? true : undefined}/>
    );
};


export default TextInput;