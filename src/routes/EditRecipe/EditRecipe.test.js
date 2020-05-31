import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EditRecipe from './EditRecipe';


const recipe = [
  {
    "id": 1,
        "name": "Cookies",
        "ingredients": [
          "1 package - cookie dough",
      ],
        "directions": [
            "Preheat oven to 325 degrees",
            "Get the dough from the fridge",
            "Bake on nonstick cookie sheet for 16 minutes",
        ],
  }
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditRecipe location={{state:recipe}}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
