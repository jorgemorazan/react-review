import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type toDoItem = {
  id: string;
  description: string;
  completed: boolean;
};

function TodoList() {
  const [inputVal, setInputVal] = useState<string>("");
  const [todoList, setTodoList] = useState<toDoItem[]>([]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const newToDo: toDoItem = {
      id: uuidv4(),
      description: inputVal,
      completed: false,
    };
    setTodoList([...todoList, newToDo]);
  };
  const deleteToDo = (id: string) => {
    const updatedToDo = todoList.filter((toDoItem) => toDoItem.id !== id);
    setTodoList(updatedToDo);
  };
  const completeToDo = (id: string) => {
    const updatedToDo = todoList.map((toDoItem) => {
      if (toDoItem.id === id) {
        return {
          id: toDoItem.id,
          description: toDoItem.description,
          completed: !toDoItem.completed,
        };
      }
      return toDoItem;
    });
    setTodoList(updatedToDo);
  };
  return (
    <>
      <form className="flex flex-wrap" onSubmit={handleSubmit}>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="To do..."
        ></input>
        <button
          className="bg-green-600 text-white rounded-2xl box-border border border-transparent hover:bg-green-800 focus:ring-4 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
          type="submit"
        >
          Add To Do...
        </button>
      </form>

      <div className="shadow-xs flex border box-border rounded-2xl">
        <table className="text-sm text-left text-body">
          <thead className="text-sm text-body border-b border-default-medium">
            <tr>
              <th scope="col" className="px-3 py-3 font-medium">
                Task ID
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Completed
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Complete To Do
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((toDo) => {
              return (
                <tr key={toDo.id}>
                  <td className="px-3 py-4">{toDo.id}</td>
                  <td className="px-3 py-4">{toDo.description}</td>
                  <td className="px-3 py-4">
                    {toDo.completed ? "Completed" : "Not Completed"}
                  </td>
                  <td>
                    <button
                      className="bg-blue-600 text-white rounded-2xl box-border border border-transparent hover:bg-blue-800 focus:ring-4 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                      type="button"
                      onClick={() => completeToDo(toDo.id)}
                    >
                      Complete To Do
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-red-600 text-white rounded-2xl box-border border border-transparent hover:bg-red-800 focus:ring-4 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                      type="button"
                      onClick={() => deleteToDo(toDo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodoList;
