import propTypes from 'prop-types';

const TaskList = ({ tasks, handleDelete, handleMouseDown }) => {
  return (
      tasks.map(task => 
          <div key={task.id} id={task.id} className='task' onMouseDown={handleMouseDown}>
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