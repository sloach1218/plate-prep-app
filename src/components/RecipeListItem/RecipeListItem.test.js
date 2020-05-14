import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import RecipeListItem from './RecipeListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const recipe = {
    id: 2,
    name: 'Planty',
  };
  ReactDOM.render(<Router><RecipeListItem recipe={recipe}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
