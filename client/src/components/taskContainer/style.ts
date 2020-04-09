import styled from "styled-components";

export const MainContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  padding-top: 0.8em;
  height: 2.5em;
  width: 35em;
  position: relative;
  display: flex;
`;

export const MenuInputTaskText = styled.input`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  border: #e5e7e8;
  padding-left: 18px;
  position: absolute;
  align-self: center;
  outline: none;
`;

export const MenuChooseColors = styled.div`
  position: relative;
  margin-left: auto;
  align-self: center;
  position: relative;
  display: inline-flex;
  margin-right: -1.5em;
`;

export const MenuAddButton = styled.a`
  color: white;
  padding: 0.4em 1.3em;
  border-radius: 3px;
  background: #26a59a;
  box-shadow: 0 -3px #58a49d inset;
  transition: 0.2s;
  margin: 0 1em;

  &:hover {
    background: rgb(53, 167, 110);
  }
  &:active {
    background: rgb(33, 147, 90);
    box-shadow: 0 3px rgb(33, 147, 90) inset;
  }
`;

export const TaskList = styled.div`
  margin-top: 1em;
  margin-right: -1.1em;
`;

export const DeleteButton = styled.a`
  color: white;
  margin-left: 34em;
  position: absolute;
`;

export const TaskListWithDelete = styled.div`
  border-radius: 2px;
  margin-top: 1px;
  margin-bottom: 1px;
  height: 3em;
  width: 36.1em;
  display: flex;
  align-items: center;
`;
