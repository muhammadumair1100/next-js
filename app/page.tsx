"use client";
import { useState } from "react";
import { addTodo, deletTodo } from "./_actions/addTodo";

export default function Home() {
  type TodoList = {
    id: number;
    todo: string;
  };

  let [search, setSearch] = useState<string>("");
  let [todos, setTodos] = useState<TodoList[]>([]);

  async function handleAdd() {
    if (search.trim() === "") return;

    const newTodo = { id: Date.now(), todo: search };
    const result = await addTodo(newTodo);
    console.log(result);
    // setTodos(result);
    setSearch("");
  }

  async function handleDelet(todoId: number) {
    const result = await deletTodo(todoId);
    console.log(result);
    // setTodos(result);
  }

  return (
    <div className="mt-20 overflow-y-auto flex flex-col gap-10 px-20 py-10 border max-h-[80%] rounded-md">
      <div className="flex rounded-lg gap-4">
        <input
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          type="text"
          placeholder="Add"
          className="outline-none border px-3 rounded-md"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500/90 px-5 py-1 rounded-md font-medium text-lg text-white cursor-pointer"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col  gap-5">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex bg-gray-200 px-4 py-2 rounded-md justify-between items-center"
          >
            <h1 className="font-bold">{todo.todo}</h1>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleDelet(todo.id)
              }
              className="bg-red-500/90 cursor-pointer text-white font-medium px-5 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
