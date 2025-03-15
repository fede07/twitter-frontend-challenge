import styled from 'styled-components';

export const StyledChatRoomsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: 1px solid #e6e6e6;
    padding: 16px;
    min-width: 200px;
    max-width: 400px;
    width: 100%;
    text-align: left;
    
    @media (max-width: 1265px) {
        display: none;
    }

`;
