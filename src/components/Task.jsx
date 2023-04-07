import { useState } from "react"

export const Task = (props) => {

    const [edit, setEdit] = useState(false)
    const [newValue, setNewValue] = useState(props.value)

    // Function that updates the list of tasks when this task is checked as completed
    const handleCheck = (id) => {
        props.setTasks(prevTasks => {
            return prevTasks.map(task => {
                return task.id === id ? { ...task, completed: !task.completed } : task
            })
        })
    }

    // Function that updates the list of tasks when this task is deleted
    const handleDelete = (id) => {
        props.setTasks(prevTasks => {
            return prevTasks.filter(task => {
                return task.id !== id
            })
        })
    }

    const handleEdit = () => {
        setEdit(true)
    }
    const handleValueChange = (e) => {
        const { value } = e.target
        setNewValue(value)
    }

    const handleCancel = () => {
        setEdit(false)
        setNewValue(props.value)
    }

    const handleSave = (id) => {
        props.setTasks(prevTasks => {
            return prevTasks.map(task => {
                return task.id === id ? { ...task, value: newValue } : task
            })
        })
        setEdit(false)
        setNewValue(newValue)
    }

    if (edit) {
        return (
            <div className="flex flex-col gap-2 px-2">
                <p className="text-amber-500">New name for <span className="font-bold">{props.value}</span></p>
                <input
                    className="py-2 px-4 rounded-md"
                    type="text"
                    onChange={handleValueChange}
                    value={newValue}
                />
                <div className="flex -flex-row gap-2">
                    <button className="py-2 px-4 bg-gray-700 text-gray-50 rounded-md" onClick={handleCancel}>cancel</button>
                    <button className="py-2 px-4 bg-blue-500 text-gray-50 rounded-md" onClick={() => handleSave(props.id)}>save</button>
                </div>
            </div>
        )
    }

    return (
        <div className="border-b-2 border-zinc-900 py-2 px-4">
            <div className="flex flex-row py-2 gap-3">
                <input checked={props.checked} onChange={() => handleCheck(props.id)} type="checkbox" />
                <p className={`${props.checked ? "line-through" : ""} text-amber-500`}>{props.value}</p>
            </div>
            <div className="flex flex-row gap-2">
                <button className="py-2 px-4 rounded-md bg-green-400 text-gray-100" onClick={handleEdit}>Edit</button>
                <button className="py-2 px-4 rounded-md bg-red-400 text-gray-100" onClick={() => handleDelete(props.id)}>Delete</button>
            </div>
        </div>
    )
}