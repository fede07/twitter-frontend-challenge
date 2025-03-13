import styled from 'styled-components';

export const StyledInfiniteScroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 180px);
  overflow-y: scroll;
    
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
    &::-webkit-scrollbar { 
        display: none/* WebKit */
    }
`
