import styled from "styled-components";

export const DisplayOptions = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskList = styled(DisplayOptions)`
  border-radius: 2px;
  margin-top: 1px;
  margin-bottom: 1px;
  height: 3em;
  width: 36.1em;
`;

export const TaskText = styled(DisplayOptions)`
  border-left: 1px solid #ebf3f6;
  height: 100%;
  padding-left: 1em;
  color: white;
`;

export const TaskCheckbox = styled.input`
  margin-left: 1.6em;
  margin-right: 1.6em;
`;
