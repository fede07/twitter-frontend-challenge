import styled from "styled-components";

export const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 16px;

  @media (max-width: 1024px) {
    justify-content: left;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
