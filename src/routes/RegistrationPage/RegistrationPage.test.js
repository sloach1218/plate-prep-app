import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><RegistrationPage /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
