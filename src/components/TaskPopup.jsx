import propTypes from 'prop-types';

const TaskPopup = (props) => {
  return (
    <div id='taskViewer'>
      <h1 className='closePopup' onClick={() => props.setPopup(false)}>X</h1>
      <h1 id="titleDisplay">{props.title}</h1>
      <h2 id="contentDisplay">{props.content}</h2>
      <p id="dateDisplay">{props.date}</p>
    </div>
  )
}

TaskPopup.propTypes = {
  title: propTypes.string,
  content: propTypes.string,
  date: propTypes.string,
  setPopup: propTypes.func,
}

export default TaskPopup