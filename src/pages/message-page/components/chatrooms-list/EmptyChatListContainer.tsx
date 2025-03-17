import styled from 'styled-components';

export const StyledEmptyChatListContainer = styled.div`
    display: flex;
    flex-direction: column;
    //height: 48%;
    justify-content: center;
    align-items: center;
    padding: 16px 16px 0;
    gap: 16px;

    font-family: ${(props) => props.theme.font.default};
`
