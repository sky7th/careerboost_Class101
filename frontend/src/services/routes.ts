import http from './http';

const urlPath = '/todos';

const getAllTodos = () => {
    return http.get(urlPath);
};

const addTodoItem = (newItem: any) => {
    return http.post(urlPath, { ...newItem });
};

const updateTodoItem = (updatedItem: any) => {
    const todoId = updatedItem._id;
    delete updatedItem._id;
    return http.put(`${urlPath}/${todoId}`, updatedItem);
};

const deleteTodoItem = (todoId: any) => {
    return http.delete(`${urlPath}/${todoId}`);
};

const getCompleted = () => {
    return http.get(`${urlPath}/filter/completed`);
};

const getIncompleted = () => {
    return http.get(`${urlPath}/filter/incompleted`);
};

export {
    getAllTodos,
    getCompleted,
    getIncompleted,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem
};