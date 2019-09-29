import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import View from '../../components/View';
import CardForm from './CardForm';

const Registration: FunctionComponent = () => (
  <View>
    <CardForm />
    <Link to="/login">
      로그인 화면
    </Link>
  </View>
);

export default Registration;
