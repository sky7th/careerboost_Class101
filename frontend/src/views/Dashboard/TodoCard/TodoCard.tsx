import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent } from 'react';
import TodoData from '../../../interfaces/todo/TodoData';
import styles from './styles.module.scss';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Author from './Author';
import Controls from './Controls';

export interface Props {
  todo: TodoData;
  id: string;
}

const TodoCard: FunctionComponent<Props> = ({ todo, id }) => (
  <Card className={styles.container}>
    <CardMedia
      className={styles.media}
      title={todo.title}
    >
      <div className={styles.authorWrapper} >
        <Author name={todo.author.name} />
      </div>
    </CardMedia>
    <CardContent className={styles.content}>
      <Typography gutterBottom variant="h5" component="h2">
        {todo.title}
      </Typography>
      <Typography component="p">
        {todo.content}
      </Typography>
    </CardContent>
    <Controls id={id}/>
  </Card>
);

export default TodoCard;
