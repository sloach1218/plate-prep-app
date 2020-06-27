//gets recipe for recipe details page
export const getRecipe = (recipe, recipeId) => {
    const theRecipe = recipe.find(recipe => recipe.id === Number(recipeId))
    return theRecipe;
}

//gets ingredients for a specific recipe
export const getIngredients = (ingredients, recipeId) => {
    const theIngredients = ingredients.filter(ingredient => ingredient.recipeId !== Number(recipeId))
    return theIngredients;
}

//gets current day, then returns entire week starting with Monday
export const getWeek = (date) => {
    
    let day = date.getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const daysoftheWeekNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    if (day === 0){
        day = 7
    } 
    
    let last = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000));

    const week=[(daysoftheWeekNames[last.getDay()])+', '+(monthNames[last.getMonth()])+' '+last.getDate(),];
    let addDay = last;

    for( let i = 0; i<7; i++){
        addDay = new Date(addDay.getTime() + (24 * 60 * 60 * 1000));
        const nextDay = (daysoftheWeekNames[addDay.getDay()])+', '+(monthNames[addDay.getMonth()])+' '+addDay.getDate()
        week.push(nextDay)
    }
    week.shift()
    
    return week;
}

//gets meals for a given date for weekplanner
export const getMeals = (recipes, date) => {
    const meals = recipes.find(recipe => recipe.date === date)
    return meals
}