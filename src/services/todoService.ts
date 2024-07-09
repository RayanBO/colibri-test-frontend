import { Todo } from '../types';

// const apiUrl = 'http://localhost:4000/api/todos';  // > URL LOCAL 
const apiUrl = 'https://sandy-zest-peach.glitch.me/api/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(apiUrl);
    return await response.json();
};

export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

export const updateTodo = async (todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${apiUrl}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
};
