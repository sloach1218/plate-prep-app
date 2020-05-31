import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddMeal from './AddMeal';
const date = [
  {
    "date": "Monday, May 24",
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddMeal  location={{state:date}}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
