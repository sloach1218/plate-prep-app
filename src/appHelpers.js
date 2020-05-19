export const getRecipe = (recipe, recipeId) => {
    const theRecipe = recipe.find(recipe => recipe.id === Number(recipeId))
    return theRecipe;
}

export const getIngredients = (ingredients, recipeId) => {
    const theIngredients = ingredients.filter(ingredient => ingredient.recipeId !== Number(recipeId))
    return theIngredients;
}

export const getWeek = (date) => {
    const day = date.getDay();
    let days;
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const daysoftheWeekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];


    if (day === 0){
        days = 0
    } if (day === 1){
        days = 1
    } if (day === 2){
        days = 2
    } if (day === 3){
        days = 3
    }  if (day === 4){
        days = 4
    }  if (day === 5){
        days = 5
    }  if (day === 6){
        days = 6
    }

    
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

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