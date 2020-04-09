import styled from "styled-components";

export const ColorRadioButtonsContainer = styled.div`
  margin-top: 0.5em;
`;

export const ColorRadioButton = styled.label`
  display: inline;
  position: relative;
  padding-right: 25px;
`;

export const ColorCheckmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 20%;
`;

export const InputRadio = styled.input`
  position: absolute;
  opacity: 100%;
  &:checked + ${ColorCheckmark} {
    border: 1.5px double white;
  }
`;
