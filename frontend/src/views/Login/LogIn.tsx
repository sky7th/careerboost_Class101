import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import View from '../../components/View';
import CardForm from './CardForm';

const LogIn: FunctionComponent = () => (
  <View>
    <CardForm />
    <Link to="/registration">
      Don't have an account?
    </Link>
  </View>
);

export default LogIn;
