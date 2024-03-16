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
    setTaskTitle(''); // Erasing the inputs after adding new task
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
    taskTitle && taskContent && setTasks([...tasks, newItem]); // If title and content are both not null
    taskItemList.current.scrollTop = taskItemList.current.scrollHeight; // Scoll to the added task in Todo
  }

  // The plus button that shows the button and the inputs to add new task in the Todo column
  const handleShowElement = () => {
    setIsClicked(!isClicked);
  }

  // Using useRef instead of using DOM (querySelector or getElement)
  let currentTask = useRef(null);
  let todoColumn = useRef(null);
  let inProgressColumn = useRef(null);
  let doneColumn = useRef(null);

  // Handle deletion
  const handleDelete = (id) => {
    // First 3 rows are just to make sure the task getting deleted without causing error
    let thisTask = tasks.find(task => task.id === id);
    thisTask.parentColumn !== 'todoColumn' &&
    //Make sure to move the deleted task to the main column first to avoid consol errors
    todoColumn.current.querySelector('.taskContainer').appendChild(document.getElementById(thisTask.id));
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Adding permission to move tasks among columns
  const [movePerm, setMovePerm] = useState(false);
  const [chosenColumn, setChosenColumn] = useState(null);

  const handleMouseDown = ({ target }) => {
    if(target.className !== 'trashBtn'){ // Exclude the delete button from handle movement
      currentTask.current = target; // Selecting the task to move
      setMovePerm(true);
    }
  }

  // Styling all columns to distinguish them from the chosen column
  useEffect(() => {
    const handleColumnStyle = () => {
      todoColumn.current.style.backgroundColor = '#ddddddb7';
      inProgressColumn.current.style.backgroundColor = '#ddddddb7';
      doneColumn.current.style.backgroundColor = '#ddddddb7';
    }

    // Highlighting only the hovered column during movement
    const handleColumns = (evt) => {
      setChosenColumn(evt.current);
      handleColumnStyle();
      evt.current.style.backgroundColor = '#bdc';
    }

    // Handle the movement of tasks among columns
    const handleMouseMove = (evt) => {
      currentTask.current.style.position = 'absolute';
      // Making sure that the task is being moved appropirately
      currentTask.current.style.left = evt.clientX - currentTask.current.offsetWidth/2 + 'px';
      currentTask.current.style.top = evt.clientY - currentTask.current.offsetHeight/2 + 'px';
      // Choosing the hovered column while moving tasks
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

    // Stop the process of the tasks movement on mouse up event
    const handleMouseUp = (evt) => {
      if(movePerm && chosenColumn) {
        setMovePerm(false);
        currentTask.current.style.position = 'static';
        chosenColumn.querySelector('.taskContainer').appendChild(currentTask.current);
        // Changing the column name of the task, for storage purposes
        const newTasks = tasks.map(task => task.id == currentTask.current.id ? {...task, parentColumn: chosenColumn.id} : task);
        setTasks(newTasks);
        setChosenColumn(null);
        handleColumnStyle();
      } else { // Make sure that the clicked element is in fact a task
        if(evt.target.className == 'task'){
          setMovePerm(false);
          setChosenColumn(null);
          // Display the clicked task
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

  // Publishing each tesk to it's column
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