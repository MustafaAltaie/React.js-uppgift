import propTypes from 'prop-types';

const SettingsList = (props) => {
  return (
    props.isClicked && (
        <>
        <input type="text" placeholder="Add Title" value={props.taskTitle} onChange={evt => props.setTaskTitle(evt.target.value)} />
        <textarea placeholder="Add Content" value={props.taskContent} onChange={evt => props.setTaskContent(evt.target.value)}></textarea>
        <button onClick={props.handleNewTask}>Add</button>
        </>
    )
  )
}

SettingsList.propTypes = {
    setTaskTitle: propTypes.func,
    taskTitle: propTypes.string,
    setTaskContent: propTypes.func,
    taskContent: propTypes.string,
    handleNewTask: propTypes.func,
    isClicked: propTypes.bool
}

export default SettingsList