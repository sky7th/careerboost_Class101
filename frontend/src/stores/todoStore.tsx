import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

export class TodoStore {
    @observable todos: { id: string; text: string }[] = [];
    constructor() {
        action((snapshot: firebase.database.DataSnapshot) => {
            if (snapshot) {
                const list = snapshot.val();
                const todos = [];
                if (list !== null) {
                    for (const key of Object.keys(list)) {
                        todos.push({
                            id: key,
                            text: list[key]
                        });
                    }
                }
                this.todos = todos;
            }
        })
    }
    @autobind
    @action
    addTodo(text: string) {
        const ref = db.ref();
        ref
            .child('todos')
            .push()
            .set(text);
    }
    @autobind
    @action
    deleteTodo(id: string) {
        const ref = db.ref();
        ref
            .child('todos')
            .child(id)
            .remove();
    }
}

export default new TodoStore();