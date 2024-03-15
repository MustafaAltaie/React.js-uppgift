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
      date: new Date().toLocaleDateString(),
      parentColumn: 'todoColumn'
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


  let currentTask = useRef(null);
  let todoColumn = useRef(null);
  let inProgressColumn = useRef(null);
  let doneColumn = useRef(null);
  const [movePerm, setMovePerm] = useState(false);
  const [chosenColumn, setChosenColumn] = useState(null);

  const handleMouseDown = ({ target }) => {
    if(target.className !== 'trashBtn'){
      currentTask.current = target;
      setMovePerm(true);
    }
  }

  useEffect(() => {
    const handleColumnStyle = () => {
      todoColumn.current.style.backgroundColor = '#ddddddb7';
      inProgressColumn.current.style.backgroundColor = '#ddddddb7';
      doneColumn.current.style.backgroundColor = '#ddddddb7';
    }

    const handleColumns = (evt) => {
      setChosenColumn(evt.current);
      handleColumnStyle();
      evt.current.style.backgroundColor = '#bdc';
    }

    const handleMouseMove = (evt) => {
      currentTask.current.style.position = 'absolute';
      currentTask.current.style.left = evt.clientX - currentTask.current.offsetWidth/2 + 'px';
      currentTask.current.style.top = evt.clientY - currentTask.current.offsetHeight/2 + 'px';
      if(evt.clientX > todoColumn.current.offsetLeft
      && evt.clientX < todoColumn.current.offsetLeft + todoColumn.current.offsetWidth){
        handleColumns(todoColumn);
      }
      else if(evt.clientX > inProgressColumn.current.offsetLeft
      && evt.clientX < inProgressColumn.current.offsetLeft + inProgressColumn.current.offsetWidth){
        handleColumns(inProgressColumn);
      }
      else if(evt.clientX > doneColumn.current.offsetLeft
      && evt.clientX < doneColumn.current.offsetLeft + doneColumn.current.offsetWidth){
        handleColumns(doneColumn);
      }
    }

    if(movePerm)
      window.addEventListener('mousemove', handleMouseMove);
    else
      window.removeEventListener('mousemove', handleMouseMove);

    const handleMouseUp = (evt) => {
      if(movePerm && chosenColumn) {
        setMovePerm(false);
        currentTask.current.style.position = 'static';
        chosenColumn.querySelector('.taskContainer').appendChild(currentTask.current);
        const newTasks = tasks.map(task => task.id == currentTask.current.id ? {...task, parentColumn: chosenColumn.id} : task);
        setTasks(newTasks);
        setChosenColumn(null);
        handleColumnStyle();
      } else {
        if(evt.target.className == 'task'){
          setMovePerm(false);
          setChosenColumn(null);
          const thisTask = tasks.find(task => task.id == evt.target.id);
          alert(thisTask.content);
        }
      }
    }

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
  }, [movePerm, chosenColumn, tasks]);

  function handleChildren() {
    tasks.forEach(task => handleAppendChildren(task.parentColumn, task.id));
  }
  handleChildren();

  function handleAppendChildren(columnName, child) {
    setTimeout(() => {
      document.querySelector('#' + columnName).querySelector('.taskContainer').appendChild(document.getElementById(child));
    }, 10)
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
      taskItemList={taskItemList}
      handleMouseDown={handleMouseDown}
      inProgressColumn={inProgressColumn}
      doneColumn={doneColumn}
      todoColumn={todoColumn} />
    </div>
  )
}

export default App