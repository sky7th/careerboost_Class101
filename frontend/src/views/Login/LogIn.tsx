import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import View from '../../components/View';
import CardForm from './CardForm';

const LogIn: FunctionComponent = () => (
  <View>
    <CardForm />
    <Link to="/registration">
      회원가입
    </Link>
  </View>
);

export default LogIn;
