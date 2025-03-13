import styled from 'styled-components';

export const StyledMessage = styled.div<{ isUser: boolean }>`
    display: flex;
    flex-direction: row;
    align-self: ${({isUser}) => (isUser ? 'flex-end' : 'flex-start')};
    background: ${({isUser}) =>
            isUser ? 'rgb(237,237,237)' : 'rgb(74, 153, 233)'};
    text-align: ${({isUser}) => (isUser ? 'left' : 'right')};
    padding: 16px;
    border-radius: ${({isUser}) => (isUser ? '16px 16px 0 16px' : '16px 16px 16px 0')};
    color: ${({isUser}) => (isUser ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')};
    margin: 8px;
    width: fit-content;
`;
