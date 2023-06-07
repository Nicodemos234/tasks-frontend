import { useCallback, useEffect, useMemo, useState } from "react";
import { getTasks } from "./services";
import { CreateTaskModal, TaskCard } from "./components";
import { styled } from "styled-components";
import { Button } from "./styles";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #181c28;
  color: #fffeff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 8px;
`;



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [modalTaskOpen, setModalTaskOpen] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const updateTasks = useCallback(() => {
    getTasks().then((res) => setTasks(res.data));
  }, []);

  useEffect(() => {
    updateTasks();
  }, [updateTasks]);

  const switchTaskModal = useCallback(() => {
    setModalTaskOpen((isOpen) => !isOpen);
  }, []);

  const filteredTasks = useMemo(
    () =>
      !showAllTasks
        ? tasks.filter(
            (task) =>
              task.daily ||
              new Date(task.endDate).toDateString() ===
                new Date().toDateString()
          )
        : tasks,
    [showAllTasks, tasks]
  );

  const switchShowAllTasks = useCallback(
    () => setShowAllTasks((showAllTasks) => !showAllTasks),
    []
  );

  const showAllTasksLabel = useMemo(
    () => (!showAllTasks ? "Mostrar todas as tasks" : "Somente tasks de hoje"),
    [showAllTasks]
  );

  return (
    <Wrapper>
      <Button onClick={switchTaskModal}>Adicionar task</Button>
      <Button onClick={switchShowAllTasks}>{showAllTasksLabel}</Button>
      <ul>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} updateTasks={updateTasks} />
        ))}
      </ul>
      <CreateTaskModal
        isOpen={modalTaskOpen}
        close={switchTaskModal}
        updateTasks={updateTasks}
      />
    </Wrapper>
  );
};

export default App;
