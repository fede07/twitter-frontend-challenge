import styled from 'styled-components';

export const StyledChatContainer = styled.div<{isHidden?: boolean}>`
    display: flex;
    flex-direction: column;
    height:98%;
    margin: 16px;
    width: 100%;
    min-width: 400px;
    max-height: 95vh;

    @media (max-width: 800px) {
        display: ${(props) => props.isHidden ? 'none' : 'block'};
        height: 75%;
    }
`
