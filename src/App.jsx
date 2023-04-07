import { useState } from "react"
import { Task } from "./components/Task"
import { FilterButton } from "./components/FilterButton"
import { nanoid } from "nanoid"


export default function App() {
  // State Variables
  const [newTask, setNewTask] = useState({})
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("All")

  // List of the tasks to display
  let tasksToDisplay = []
  if (filter === "All") {
    tasksToDisplay = tasks
  } else if (filter === "Active") {
    tasksToDisplay = tasks.filter(task => !task.completed)
  } else {
    tasksToDisplay = tasks.filter(task => task.completed)
  }

  // Function to change the state variable "FILTER"
  // const handleFilter = (value) => {
  //   const { textContent } = e.target
  //   if (textContent === filter) {
  //     return
  //   }
  //   setFilter(textContent)
  // }

  // Turning the list of tasks toa list of components
  const taskElements = tasksToDisplay.map(task => {
    return <Task
      checked={task.completed}
      id={task.id}
      key={task.id}
      value={task.value}
      setTasks={setTasks}
    />
  })

  // Function to set a new task, it handles the input value
  const handleChange = (e) => {
    const { value } = e.target
    setNewTask({
      id: nanoid(),
      completed: false,
      value: value
    })
  }

  // Function to save the new task on the list of tasks
  const handleAdd = () => {
    setTasks(prevTasks => {
      return [...prevTasks, newTask]
    })
    setNewTask({})
  }

  return (
    <>
      <main className="w-11/12 max-w-2xl mx-auto font-mono min-h-screen py-4">
        <h1 className="text-center text-gray-50 text-xl py-2">Tasks App</h1>
        <div className="flex flex-col gap-2 px-2 py-4 bg-zinc-500 rounded-md">
          <input
            className="py-2 px-4"
            value={newTask.value ? newTask.value : ""}
            onChange={handleChange}
            type="text"
            placeholder="Add your task"
          />
          <button className="py-2 px-4 bg-amber-500 text-gray-100 rounded-md" onClick={handleAdd}>Add</button>
        </div>
        <div className="flex flex-row justify-around py-4 my-2 bg-zinc-500 rounded-md">
          {/* <button className="bg-blue-400 py-2 px-4 rounded-md" onClick={handleFilter}>All</button>
          <button className="bg-blue-400 py-2 px-4 rounded-md" onClick={handleFilter}>Active</button>
          <button className="bg-blue-400 py-2 px-4 rounded-md" onClick={handleFilter}>Completed</button> */}
          <FilterButton setFilter={setFilter} filter={filter} value="All" />
          <FilterButton setFilter={setFilter} filter={filter} value="Active" />
          <FilterButton setFilter={setFilter} filter={filter} value="Completed" />
        </div>
        <div className="flex flex-col gap-2 bg-zinc-500 rounded-md py-4">
          {taskElements}
        </div>
      </main>
    </>
  )
}