import styled from 'styled-components';

export const StyledChatRoomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f3f4;
  }

  $active {
    background-color: #f0f3f4;
  }
`
