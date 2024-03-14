import TaskList from "./TaskList";
import propTypes from 'prop-types';
import SettingsList from "./SettingsList";

const Main = (props) => {
    return (
        <main>
            <div className="column">
                <h2>Todo</h2>
                <div className="taskContainer" ref={props.taskItemList}>
                    <TaskList tasks={props.tasks} handleDelete={props.handleDelete} />
                </div>
                <SettingsList
                taskTitle={props.taskTitle}
                setTaskTitle={props.setTaskTitle}
                taskContent={props.taskContent}
                setTaskContent={props.setTaskContent}
                isClicked={props.isClicked}
                handleNewTask={props.handleNewTask} />
                <h1 onClick={props.handleShowElement} style={{transform: props.isClicked ? 'rotate(135deg) scale(1.5)' : 'rotate(0deg) scale(1)'}}>+</h1>
            </div>
            <div className="column">
                <h2>In Progress</h2>
            </div>
            <div className="column">
                <h2>Done</h2>
            </div>
        </main>
    )
}

Main.propTypes = {
    tasks: propTypes.array,
    setTaskTitle: propTypes.func,
    taskTitle: propTypes.string,
    setTaskContent: propTypes.func,
    taskContent: propTypes.string,
    handleNewTask: propTypes.func,
    handleShowElement: propTypes.func,
    isClicked: propTypes.bool,
    handleDelete: propTypes.func,
    taskItemList: propTypes.object
}

export default Main