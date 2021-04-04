import React, { useState, useEffect } from 'react';

const TodoForm = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));

  const [tasks, setTasks] = useState(savedTasks || []);
  const [task, setTask] = useState('');
  const [taskId, setTaskId] = useState('');
  var colors = ['red', 'green', 'blue', 'orange', 'yellow'];

  const submitHandler = (e) => {
    e.preventDefault();

    if (taskId) {
      // update the old task
      if (task.trim()) {
        let updatedtasks = tasks.map((t) => {
          if (t.id === taskId) {
            t.task = task;
            t.id = Date.now();
            t.active = true;
          }
          return t;
        });

        setTasks(updatedtasks);
        setTask('');
        setTaskId('');
        saveTaskToLocalStorage(updatedtasks);
      }
    } else {
      // create new task
      if (task.trim()) {
        let newTasks = [...tasks, { task: task, id: Date.now(), active: true }];
        setTasks(newTasks);
        setTask('');
        saveTaskToLocalStorage(newTasks);
      }
    }
  };

  const saveTaskToLocalStorage = (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    }
  }, []);

  const editHandler = (e, id, value) => {
    e.preventDefault();
    setTaskId(id);
    setTask(value);
  };

  const delHandler = (e, id) => {
    e.preventDefault();
    const filteredTasks = tasks.filter((x) => x.id !== id);
    setTasks(filteredTasks);
    saveTaskToLocalStorage(filteredTasks);
  };

  const completHandler = (taskId) => {
    let completedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.active = !task.active;
      }
      return task;
    });
    setTasks(completedTasks);
    saveTaskToLocalStorage(completedTasks);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div class='input-group mb-3'>
          <input
            type='text'
            class='form-control'
            placeholder='New Task ......'
            aria-label='New Task'
            aria-describedby='button-addon2'
            task-id={taskId}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            class='btn btn-primary'
            type='submit'
            style={{ 'background-color': '#ca4c03' }}
          >
            {taskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
      <div className='todo-list'>
        {tasks.length < 1 && <div className='noTask'>No Task Found</div>}
        {tasks.map((task) => (
          <div className='todo-item' key={task.id}>
            <div className='checker'>
              <span className=''>
                <input
                  type='checkbox'
                  className='checkbox'
                  checked={task.active ? false : true}
                  onClick={(e) => completHandler(task.id)}
                />
              </span>
            </div>
            <span className='task'>
              {task.active ? task.task : <strike>{task.task}</strike>}
            </span>

            <a href='/#' onClick={(e) => delHandler(e, task.id, task.task)}>
              <i class='fas fa-trash-alt'></i>
            </a>
            {task.active && (
              <a href='/#' onClick={(e) => editHandler(e, task.id, task.task)}>
                <i class='fas fa-edit'></i>
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoForm;
