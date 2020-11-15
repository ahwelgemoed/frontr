import styled from "styled-components";

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 30vw 1fr;
  grid-gap: 20px;
  background-color: #0a0a0a;
  height: 100vh;
  padding: 20px;
  & > div {
    /* padding: 20px; */
  }
`;
export const Cards = styled.div`
  display: flex;
  max-height: 85vh;
  width: "100%";
  overflow: auto;
  padding: 10px;
  /* justify-self: center; */
  border-radius: 5px;
  /* width: 100%; */
  background-color: #131313;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #4a4a4a40;
  flex-flow: row wrap;
  margin-bottom: 20px;
  & > h2 {
    width: 100%;
  }
  & > input {
    font-size: 16px;
    height: 30px;
    width: 92%;
    background-color: #fff;
    border: 1px solid #4a4a4a40;
    color: #000;
  }
  & > button {
    background-color: #69676c;
    border: none;
    color: #fff;
    font-size: 20px;
    width: 7%;
  }
`;
export const CardHeader = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
`;

export const RightCardBody = styled.div`
  height: 100%;
  padding-top: 20px;
  display: grid;
`;
export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
`;
