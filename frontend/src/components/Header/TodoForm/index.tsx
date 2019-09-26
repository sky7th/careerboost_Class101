import { withFormik } from 'formik';
import { toast } from 'react-toastify';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';
import { addTodo } from '../../../api/todos';
import CreateTodoData from '../../../interfaces/todo/CreateTodoData';
import TodoData from '../../../interfaces/todo/TodoData';
import { addTodoAction } from '../../../store/actions/dashboard';
import TodoForm, { Props } from './TodoForm';
import { inject, observer } from 'mobx-react';

interface RecomposeProps extends Props {
  addTodoDispatcher: (createTodoData: CreateTodoData) => void;
}

const enhance = compose<Props, {}>(
  inject('UserStore'),
  withProps(
    ({ TodoStore }) => {
      return {
        TodoStore: TodoStore
      }
    } 
  ),
  withHandlers<RecomposeProps, {}>({
    addTodoDispatcher: ({ TodoStore }) => (todoData: TodoData) => {
      TodoStore.addTodoAction(todoData);
    },
  }),
  withFormik<RecomposeProps, CreateTodoData>({
    mapPropsToValues: () => ({
      content: '',
      title: '',
      isCompleted: false,
    }),
    handleSubmit: (loginData, { setSubmitting, resetForm, props: { addTodoDispatcher } }) => {
      addTodo(loginData)
        .then((todoData: TodoData) => {
          addTodoDispatcher(todoData);
          toast.success('할 일 추가 완료 !');
          resetForm();
        });
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      content: Yup.string()
        .required('Required'),
      title: Yup.string()
        .required('Required'),
    }),
  }),
);

export default enhance(TodoForm);
