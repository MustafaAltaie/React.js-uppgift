import './App.css'
import Header from './components/header';
import Main from './components/Main';
import { useState, useEffect, useRef } from "react";

function App() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskContent, setTaskContent] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const taskItemList = useRef(null);

  useEffect(() => {
    setTaskTitle('');
    setTaskContent('');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTask = () => {
    const newItem = {
      id: Date.now(),
      title: taskTitle,
      content: taskContent,
      date: new Date().toLocaleDateString()
    }
    taskTitle && taskContent && setTasks([...tasks, newItem]);
    taskItemList.current.scrollTop = taskItemList.current.scrollHeight;
  }

  const handleShowElement = () => {
    setIsClicked(!isClicked);
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div id="mainContainer">
      <Header />
      <Main tasks={tasks}
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      taskContent={taskContent}
      setTaskContent={setTaskContent}
      handleNewTask={handleNewTask}
      handleShowElement={handleShowElement}
      isClicked={isClicked}
      handleDelete={handleDelete}
      taskItemList={taskItemList} />
    </div>
  )
}

export default App
