import TaskList from "./TaskList";
import propTypes from 'prop-types';
import SettingsList from "./SettingsList";
import { useState, useEffect } from 'react';

const Main = (props) => {
    const columnList = ['inProgressColumn', 'doneColumn'];
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem('columns')) || columnList);
    const [newColumn, setNewColumn] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        !newColumn && setInput('');
    }, [newColumn]);

    const handleNewColumn = () => {
        setColumns([...columns, input + 'Column']);
        setInput('');
    }

    useEffect(() => {
        localStorage.setItem('columns', JSON.stringify(columns));
        setNewColumn(false);
    }, [columns]);

    const handleColumnDeletion = (clmn) => {
        const newColumns = columns.filter(column => column !== clmn);
        setColumns(newColumns);
    }

    return (
        <main ref={props.mainSection} style={{pointerEvents: props.popup ? 'none' : 'unset'}}>
            <h1 title={newColumn ? 'Close' : 'Add Column'} id='addColumnBtn' onClick={() => setNewColumn(!newColumn)} style={{transform: `rotate(${newColumn ? 45 : 0}deg)`}}>+</h1>
            {newColumn && <input type="text" id="newColumnText" placeholder="Column Name" autoFocus value={input} onChange={(e) => setInput(e.target.value)} />}
            {input && <button id='newColumnSubmit' onClick={handleNewColumn}>Add {input}</button>}
            <div id="columnContainer">
                <div className="column" id='todoColumn'>
                    <h2>Todo</h2>
                    <div className="taskContainer" ref={props.taskItemList}>
                        <TaskList tasks={props.tasks}
                        handleDelete={props.handleDelete}
                        handleMouseDown={props.handleMouseDown} />
                    </div>
                    <SettingsList
                    taskTitle={props.taskTitle}
                    setTaskTitle={props.setTaskTitle}
                    taskContent={props.taskContent}
                    setTaskContent={props.setTaskContent}
                    isClicked={props.isClicked}
                    handleNewTask={props.handleNewTask} />
                    <h1 title={props.isClicked ? 'Close' : 'Add Task'} onClick={props.handleShowElement} style={{transform: props.isClicked ? 'rotate(135deg) scale(1.5)' : 'rotate(0deg) scale(1)'}}>+</h1>
                </div>
                {columns.map(column => (
                    <div className="column" id={column.replace(/ /g, '')} key={column}>
                        <h6 className='deleteColumnBtn' onClick={() => handleColumnDeletion(column)}>Delete {column.slice(0, column.length-6)}</h6>
                        <h2>{column.slice(0, column.length-6)}</h2>
                        <div className="taskContainer"></div>
                    </div>
                ))}
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
    taskItemList: propTypes.object,
    handleMouseDown: propTypes.func,
    mainSection: propTypes.object,
    popup: propTypes.bool
}

export default Main