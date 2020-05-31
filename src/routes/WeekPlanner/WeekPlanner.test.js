import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WeekPlanner from './WeekPlanner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><WeekPlanner /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
