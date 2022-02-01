import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import filterObj from "../utils/filterObj";
import DropDown from "./DropDown";

export default function TagNav({ parameter, setParameter, size }) {
  return (
    <Container size={size} id="tagNav" style={{ display: "flex", position: "sticky", top: 0 }}>
      {filterObj.map((filter) => {
        return (
          <StyledDiv key={filter.id}>
            <DropDown
              size={size}
              id={filter.id}
              parameter={parameter}
              setParameter={setParameter}
              title={filter.text}
              data={filter.data}
            />
          </StyledDiv>
        );
      })}
    </Container>
  );
}
const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => props.borderBottom && "4px solid black"};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  border-top: 1px solid rgba(0, 0, 0, 0.6);
  z-index: 99;
`;
