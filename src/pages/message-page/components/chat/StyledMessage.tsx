import styled from 'styled-components';

export const StyledMessage = styled.div<{ isUser: boolean }>`
    display: flex;
    flex-direction: row;
    align-self: ${({isUser}) => (isUser ? 'flex-end' : 'flex-start')};
    background: ${({isUser}) =>
            isUser ? 'rgb(74, 153, 233)' : 'rgb(237,237,237)'};
    text-align: ${({isUser}) => (isUser ? 'left' : 'right')};
    padding: 16px;
    border-radius: ${({isUser}) => (isUser ? '24px 24px 0 24px' : '24px 24px 24px 0')};
    color: ${({isUser}) => (isUser ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)')};
    margin: 4px;
    width: fit-content;
    min-width: 30px;
    max-width: 80%;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
`;
