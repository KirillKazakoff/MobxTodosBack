/* eslint-disable arrow-body-style */
import initData from './dbInit';

class Db {
    constructor() {
        this.users = initData;
    }

    getUser(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user) throw new Error('404');
        return user;
    }

    addUser(user) {
        const match = this.users.find((u) => u.id === user.id);
        if (match) throw new Error('400');
        this.users.push(user);
        return true;
    }

    deleteTodo(userId, id) {
        const { user, todoIndex } = this.getTodoInfo(userId, id);
        user.todos.splice(todoIndex, 1);
        return true;
    }

    checkTodo(userId, id) {
        const { user, todoIndex } = this.getTodoInfo(userId, id);
        user.todos[todoIndex].status = !user.todos[todoIndex].status;
        return true;
    }

    getTodoInfo(userId, id) {
        const user = this.users.find((u) => u.id === userId);
        if (!user) throw new Error('404');

        const todoIndex = user.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) throw new Error('404');

        return { user, todoIndex };
    }
}

const db = new Db();
export default db;
