import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import RecipeContext from '../../Context';


const recipe = [
  {
    "id": 1,
        "name": "Cookies",
        "directions": [
            "Preheat oven to 325 degrees",
            "Get the dough from the fridge",
            "Bake on nonstick cookie sheet for 16 minutes",
        ],
  }
];


it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<Router><RecipeContext.Provider value={{recipe}}><RecipeDetails  match={{params: {recipeId: 1}, isExact: true, path: "", url: ""}}/></RecipeContext.Provider></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
