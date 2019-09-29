import React  from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles.module.scss';
import TodoStore from '../../../../store/TodoStore';
import UserStore from '../../../../store/UserStore';
import { observer, inject } from 'mobx-react';

interface Props {
  name?: string;
  todoStore?: TodoStore;
  userStore?: UserStore;
  id: string;
}

@inject('userStore', 'todoStore')
@observer
class Controls extends React.Component<Props> {
  private todoStore = (this.props.todoStore as TodoStore);
  private userStore = (this.props.userStore as UserStore);

  public handleClick = async (id: string) => {
    await this.todoStore.deleteTodo(id);
    console.log('here');
    await this.todoStore.getTodo(this.userStore.loginUser);
  }

  public render() {
    const todoId = this.props.id;
    return (
      <CardActions className={styles.container}>
        <IconButton onClick={() => this.handleClick(todoId)}>
          <FontAwesomeIcon icon={faEdit} size="sm" className={styles.icon} />
        </IconButton>
        <IconButton onClick={() => this.handleClick(todoId)}>
          <FontAwesomeIcon icon={faTrash} size="sm" className={styles.icon} />
        </IconButton>
      </CardActions>
    );
  }
}

export default Controls;
