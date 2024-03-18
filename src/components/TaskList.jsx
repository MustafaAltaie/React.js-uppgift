import propTypes from 'prop-types';
import { useState, useEffect } from "react";

const TaskList = ({ tasks, handleDelete, handleMouseDown }) => {
  // Animation to the tasks
  const [shift, setShift] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShift(false);
    }, 100);
  }, [shift]);

  return (
      tasks.map(task => 
        <div key={task.id} id={task.id} className='task' onMouseDown={handleMouseDown} style={{transform: `translateX(${shift ? -100 : 0}%)`}}>
          <h6>{task.date}</h6>
            <p>{task.title}</p>
            <b className='trashBtn' onClick={() => handleDelete(task.id)}>X</b>
        </div>
      )
  )
}

TaskList.propTypes = {
    tasks: propTypes.array,
    handleDelete: propTypes.func,
    handleMouseDown: propTypes.func
}

export default TaskList