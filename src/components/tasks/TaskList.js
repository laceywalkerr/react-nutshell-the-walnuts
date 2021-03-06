import React, { useState, useEffect } from 'react';
//import the components we will need
import TaskCard from './TaskCard';
import TaskManager from '../../modules/TaskManager';

const TaskList = (props) => {
  const [tasks, setTask] = useState([]);

  const getTask = () => {
    return TaskManager.getAll().then(allTask => {
      setTask(allTask)
    });
  };

  const deleteTask = id => {
    TaskManager.delete(id)
      .then(() => TaskManager.getAll()
        .then(setTask));
  };

  useEffect(() => {
    getTask();
  }, []);



  return (
    <div>
      <>
        <section className="section-content">
          <button type="button" className="btn"
            onClick={() => { props.history.push("/tasks/new") }}>
            New Task
        </button>
        </section>
      </>
      <div className="container-cards">
        {tasks.map(task => <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          {...props} />)}

      </div>
    </div>
  );
};
export default TaskList