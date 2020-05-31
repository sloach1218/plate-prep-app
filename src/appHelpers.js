export const getRecipe = (recipe, recipeId) => {
    const theRecipe = recipe.find(recipe => recipe.id === Number(recipeId))
    return theRecipe;
}

export const getIngredients = (ingredients, recipeId) => {
    const theIngredients = ingredients.filter(ingredient => ingredient.recipeId !== Number(recipeId))
    return theIngredients;
}

export const getWeek = (date) => {
    let day = date.getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const daysoftheWeekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];


    if (day === 0){
        day = 7
    } 

    
    var last = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000));
    

    const week=[(daysoftheWeekNames[last.getDay()])+', '+(monthNames[last.getMonth()])+' '+last.getDate(),];
    let addDay = last;
    

    for( let i = 0; i<6; i++){
        addDay = new Date(addDay.getTime() + (24 * 60 * 60 * 1000));
        const nextDay = (daysoftheWeekNames[addDay.getDay()])+', '+(monthNames[addDay.getMonth()])+' '+addDay.getDate()
        week.push(nextDay)
    }
    
    return week;
}

export const getMeals = (recipes, date) => {
    const meals = recipes.find(recipe => recipe.date === date)
    return meals
}