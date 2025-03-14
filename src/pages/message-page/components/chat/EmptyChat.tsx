import styled from 'styled-components';


export const StyledEmptyChat = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 100px 16px 16px;
    width: 100%;
    
    font-family: ${(props) => props.theme.font.default};
    font-size: 24px;
    text-align: center;
`
export default StyledEmptyChat;
