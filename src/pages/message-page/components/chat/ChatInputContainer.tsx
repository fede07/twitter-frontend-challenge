import styled from 'styled-components';

export const StyledChatInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: fit-content;
    justify-content: space-between;
    padding: 16px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.inputBackground};
    border-radius: 24px;
    max-height: 32px;
    gap: 12px;
`
