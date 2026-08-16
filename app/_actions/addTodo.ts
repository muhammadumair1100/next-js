"use server";

interface TodoList {
  id: number;
  todo: string;
}

let todos: TodoList[] = [];

export async function addTodo(todo: TodoList): Promise<TodoList[]> {
  todos.push(todo);
  return todos;
}

export async function deletTodo(todoId: number): Promise<TodoList[]> {
  console.log(todos);
  todos = todos.filter((t) => t.id !== todoId);
  return todos;
}
