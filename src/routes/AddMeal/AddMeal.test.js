import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRecipe from './AddRecipe';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddRecipe /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
