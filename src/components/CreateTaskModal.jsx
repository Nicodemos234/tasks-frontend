import { useCallback, useState } from "react";
import { styled } from "styled-components";
import { createTask } from "../services";
import { Button } from "../styles";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 8px;
  color: #181c28;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  color: #a44cf0;
  position: absolute;
  right: 0;
  top: 0;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 2px solid #a44cf0;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  color: black;
  font-size: 16px;
  box-shadow: 0px 0px 12px -3px #a44cf0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: ${({ isrow }) => (isrow ? "row" : "column")};
  ${({ isrow }) => (isrow ? `
  justify-content: space-between;
  align-items: center;
  ` : "")}
`;

const Label = styled.label`
  margin: 4px 0;
`;

export const CreateTaskModal = ({ isOpen, close, updateTasks }) => {
  const [title, setTitle] = useState("");
  const [daily, setDaily] = useState(false);
  const [endDate, setEndDate] = useState();

  const handleSubmit = useCallback(async () => {
    const res = await createTask(
      title,
      daily,
      endDate ? new Date(endDate) : new Date()
    );
    if (res.data) {
      setTitle("");
      setDaily(false);
      setEndDate(undefined);
      updateTasks();
    }
  }, [daily, endDate, title, updateTasks]);
  return isOpen ? (
    <Wrapper>
      <Content>
        <CloseButton onClick={close}>X</CloseButton>
        <InputWrapper>
          <Label>Nome da task:</Label>
          <Input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          />
        </InputWrapper>
        <InputWrapper isrow="true">
          <Label>Task diária:</Label>
          <Input
            name="daily"
            onChange={() => {
              setDaily((daily) => !daily);
            }}
            type="checkbox"
            checked={daily}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Data para fazer:</Label>
          <Input
            name="endDate"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
          />
        </InputWrapper>
        <Button onClick={handleSubmit}>Criar</Button>
      </Content>
    </Wrapper>
  ) : (
    <></>
  );
};
