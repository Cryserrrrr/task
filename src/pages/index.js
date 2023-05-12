import React, { useEffect, useState } from 'react';
import { ListGroup, Form, Button, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // const requestOption = {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // };
    // fetch('http://localhost:3000/api/tasks', requestOption)
    //   .then((response) => response.json())
    //   .then((data) => setTasks(data));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask, done: false }),
    };
    fetch('http://localhost:3000/api/tasks', requestOption)
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, done: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const requestOption = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3000/api/tasks/${tasks[index]._id}`, requestOption) 
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const modifyTask = (index, title, e) => {
    e.preventDefault();
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, done: tasks[index].done }),
    };
    fetch(`http://localhost:3000/api/tasks/${tasks[index]._id}`, requestOption)
    const updatedTasks = [...tasks];
    updatedTasks[index].title = title;
    updatedTasks[index].modifyTask = false;
    console.log('updatedTasks', updatedTasks[index])
    setTasks(updatedTasks);
  };

  const toggleModifyTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].modifyTask = !updatedTasks[index].modifyTask;
    setTasks(updatedTasks);
  };

  return (
    <main>
      <h1>Task List</h1>
      <Form onSubmit={(e) => addTask(e)}>
        <Form.Group>
          <Form.Label>Add a new task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='my-2 mx-2'>
          Add Task
        </Button>
      </Form>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} variant={task.done && "success"}>
            <ToggleButton 
              type="checkbox"
              variant={'outline-secondary'}
              checked={task.done}
              onClick={() => toggleTask(index)}
            >
              Done
            </ToggleButton>
            { task.modifyTask ? (
              <>
                <Form onSubmit={(e) => modifyTask(index, e.target[0].value, e)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Enter a new task"
                      defaultValue={task.title}
                    />
                  </Form.Group>
                  <Button variant="warning" type="submit">
                    Cancel
                  </Button>
                </Form>
              </>
            ) : (
              <>
                <h2>{task.title}</h2>
                <Button variant="warning" onClick={() => toggleModifyTask(index)}>
                  Modify
                </Button>
              </>
            )}
            <Button variant="danger" onClick={() => deleteTask(index)} className='mx-2'>
              Delete
            </Button>
          </ListGroup.Item> 
        ))}
      </ListGroup>
    </main>
  );
};

export default IndexPage

export const Head = () => <title>Home Page</title>
