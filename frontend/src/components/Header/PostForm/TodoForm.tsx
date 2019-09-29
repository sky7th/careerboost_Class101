import React, { FunctionComponent } from 'react';
import FormInput from '../../FormInput';
import styles from '../../../styles/common/form-card.module.scss';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik } from 'formik';
import { observer, inject } from 'mobx-react';
import TodoStore from '../../../store/TodoStore';
import UserStore from '../../../store/UserStore';
import * as Yup from 'yup';

interface Props {
  todoStore?: TodoStore;
  userStore?: UserStore;
}

@inject('todoStore', 'userStore')
@observer
class TodoForm extends React.Component<Props> {
  private todoStore = (this.props.todoStore as TodoStore);
  private userStore = (this.props.userStore as UserStore);

  public render() {
    return (
      <div className={styles.formCard}>
        <Formik
          initialValues={{
            content: '',
            title: '',
            isCompleted: false,
          }}
          onSubmit={
            async (todoData, { setSubmitting, resetForm }) => {
              await this.todoStore.addTodo(todoData);
              toast.success('할 일 추가 완료 !');
              await this.todoStore.getTodo(this.userStore.loginUser);
              resetForm();
              setSubmitting(false);
            }
          }
          validationSchema={Yup.object().shape({
            content: Yup.string()
              .required('Required'),
            title: Yup.string()
              .required('Required'),
          })}
        >
          {
            ({ values, errors, handleChange, touched, handleSubmit }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formInputTitle}>
                  <FormInput
                    name="title"
                    label="할 일"
                    value={values.title}
                    onChange={handleChange}
                    error={errors.title}
                    touched={touched.title}
                  />
                </div>
                <div className={styles.formInputContent}>
                  <FormInput
                    name="content"
                    label="내용"
                    value={values.content}
                    onChange={handleChange}
                    error={errors.content}
                    touched={touched.content}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button color="primary" type="submit" variant="contained" >
                    추가
            </Button>
                </div>
              </form>
            )
          }
        </Formik>
      </div >
    );
  }
}

export default TodoForm;
