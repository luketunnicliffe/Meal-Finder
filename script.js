const search = document.getElementById('search'), submit = document.getElementById('submit'), random = document.getElementById('random'), mealEs = document.getElementById('meals'), resultHeading = document.getElementById('result-heading'), single_mealEl = document.getElementById('single-meal')




//Search meal and fetch from api
function searchMeal(e) {
    e.preventDefault(); //Prevents submitting to a file

    //Clear single meal
    single_mealEl.innerHTML = '';

    //Get search term
    const term = search.value;

    //Check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results for that term. Try again!</p>`;
            }else{
                mealEs.innerHTML = data.meals.map(meal => 
                    `<div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}"><h3>${meal.strMeal}</h3></div>
                    </div>`
                    ).join('');

            }
        });
//clear search text
search.value = '';
    }else{
        alert('Please enter a search term.')
    }

    console.log(term);
}


//Event listeners

submit.addEventListener('submit', searchMeal);
