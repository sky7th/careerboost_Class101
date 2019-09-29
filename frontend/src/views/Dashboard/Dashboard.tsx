import * as React from 'react';
import SvgGradient from '../../components/SvgGradient';
import View from '../../components/View';
import TodoData from '../../interfaces/todo/TodoData';
import TodoCard from './TodoCard';
import styles from './styles.module.scss';

import UserData from '../../interfaces/user/UserData';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import  UserStore from '../../store/UserStore';
import  TodoStore from '../../store/TodoStore';

export interface Props {
  userStore?: UserStore;
  todoStore?: TodoStore;
}

@inject('userStore', 'todoStore')
@observer
class Dashboard extends React.Component<Props, {}> {
  private userStore = (this.props.userStore as UserStore);
  private todoStore = (this.props.todoStore as TodoStore);

  public async componentDidMount() {
    const loginUser: UserData = this.userStore.loginUser;
    await this.todoStore.getTodo(loginUser);
  }

  public render() {
    const todos = this.todoStore.todos;
    return (
      <View>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <SvgGradient
              id="avatar-gradient"
              gradient={[
                {
                  color: '#dbd7e1',
                  offset: '0%',
                },
                {
                  color: '#a7acab',
                  offset: '50%',
                },
              ]}
            />
            {
              todos.map((todo: TodoData) => (
                <TodoCard todo={todo} key={todo._id} id={todo._id}/>
              ))
            }
          </div>
        </div>
      </View>
    );
  }
}

export default Dashboard;
