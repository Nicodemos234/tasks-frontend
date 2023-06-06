import { useCallback } from "react";
import { deleteTask } from "../services";
import { styled } from "styled-components";
import { Button } from "../styles";

const Wrapper = styled.li`
  border: 2px solid #a44cf0;
  border-radius: 8px;
  padding: 8px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TaskCard = ({ task, updateTasks }) => {
  const handleDeleteTask = useCallback(() => {
    deleteTask(task.ID).then(() => {
      updateTasks();
    });
  }, [task.ID, updateTasks]);
  return (
    <Wrapper>
      {task.title}
      <Button onClick={handleDeleteTask}>Excluir</Button>
      <Button>Concluir</Button>
    </Wrapper>
  );
};
