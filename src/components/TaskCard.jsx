import { useCallback } from "react";
import { deleteTask, markTaskAsDone } from "../services";
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
  ${({ done }) => (done ? "text-decoration: line-through; filter: grayscale(100%)" : "")}
`;

export const TaskCard = ({ task, updateTasks }) => {
  const handleDeleteTask = useCallback(() => {
    deleteTask(task.id).then(() => {
      updateTasks();
    });
  }, [task.id, updateTasks]);

  const handleMarkTaskAsDone = useCallback(() => {
    markTaskAsDone(task.id, !task.done).then(() => {
      updateTasks();
    });
  }, [task.done, task.id, updateTasks]);
  return (
    <Wrapper done={task.done}>
      {task.title}
      <Button onClick={handleDeleteTask}>Excluir</Button>
      <Button onClick={handleMarkTaskAsDone}>Concluir</Button>
    </Wrapper>
  );
};
