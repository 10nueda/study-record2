import { Todo } from "../domain/todo";
import { supabase } from "../utils/supabase";

export const getAllTodos = async (): Promise<Todo[]> => {
	const response = await supabase.from("study-record").select("*");
	if (response.error) {
		throw new Error(response.error.message);
	}
	const todosData = response.data.map((todo) => {
		return new Todo(todo.id, todo.contents, todo.time, todo.created_at);
	});

	return todosData;
};

export const addTodo = async (contents: string, time: number) => {
	await supabase
		.from("study-record")
		.insert({ contents: contents, time: time });
};

export const deleteTodo = async (id: string) => {
	await supabase.from("study-record").delete().eq("id", id);
};
