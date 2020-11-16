import styled from "styled-components";

export const LeftContainer = styled.div`
  background: #2e3035;
  border-radius: 0px 20px 20px 0px;
  display: flex;
  flex-direction: column;
`;
export const LeftBottomContainer = styled.div`
  border-radius: 0 0 0 20px;
  margin-top: auto;
`;
export const LeftBottomButtonContainer = styled.div`
  border-radius: 0 0 20px 0px;
  padding-top: 10px;
  padding-left: 24px;
  background: #363537;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  align-content: end;
`;
export const RightContainer = styled.div`
  background: #2e3035;
  height: 95vh;
  overflow: scroll;
  border-radius: 20px;
  padding: 20px;
`;
export const HeadingImage = styled.div`
  padding: 0 20px;
  color: #f7f1ff;
  & > h1 {
    padding-top: 10px;
    font-size: 55px;
    margin: 0;
  }
  & > h3 {
    margin: 0;
    padding: 0;
  }
`;
