import propTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

const TaskList = ({ tasks, handleDelete }) => {
  return (
    <ul>
        {tasks.map(task => 
            <li key={task.id}>
                <p>{task.title}</p>
                <h6>{task.date}</h6>
                <FaTrashAlt className='trashBtn' role='button' onClick={() => handleDelete(task.id)} />
            </li>
        )}
    </ul>
  )
}

TaskList.propTypes = {
    tasks: propTypes.array,
    handleDelete: propTypes.func,
}

export default TaskList