import styled from 'styled-components';

export const StyledChatRoomsListContainer = styled.div<{isHidden?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    min-width: 200px;
    width: 60%;
    text-align: left;

    @media (max-width: 800px) {
        display: ${(props) => props.isHidden ? 'none' : 'block'};
    }


`;
