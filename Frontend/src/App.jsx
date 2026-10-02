import React, { useEffect, useState } from 'react'

const API_URL = "http://localhost:5000/api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // get tasks when page loads
  useEffect(() => {
    getTasks();
  }, [])

  const getTasks = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  // add tasks
  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input,
        }),
      })
      const newTask = await response.json();
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setInput("");
    } catch (error) {
      console.log(error)
    }
  }

  // delete tasks
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      })

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  //edit task
  const editTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task:", oldTitle);
    if (!newTitle || !newTitle.trim()) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className='w-full h-screen bg-[#F9E8C6] flex items-center flex-col justify-center p-4'>
        <h1 className='text-2xl md:text-4xl font-extrabold mb-6 text-green-950 original-surfer-regular '>ToDo List</h1>
        <div className="border-2 border-green-950 rounded-lg w-[95%] sm:w-[80%] md:w-[60%] lg:w-[35%] max-h-[50vh] overflow-y-auto overflow-hidden p-4 sm:p-8 flex items-center flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className='flex flex-row gap-2'>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='py-2 px-4 rounded-2xl border-2 border-green-950' />
            <button onClick={addTask} className='rounded-2xl bg-green-950 text-white px-4 py-2'>Add</button>
          </div>
          <h2 className='text-2xl mt-2 font-extrabold mb-6 text-green-950'>Task List</h2>
          <div className='w-full'>
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between gap-8 border-2 border-green-950 p-2 rounded-xl mb-2"
              >

                <div className='min-w-0 break-all'>
                  {task.title}
                </div>

                <div className="flex gap-4 shrink-0">

                  <button
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      editTask(task._id, task.title)
                    }
                  >
                    Edit
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
