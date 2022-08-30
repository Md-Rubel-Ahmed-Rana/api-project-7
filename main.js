
// loading data from api
const loadMeals = async(search, dataLimit) => {
    const url = await `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals, dataLimit);
}


// Display the data to the UI
const displayMeals = (meals, dataLimit) => {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.textContent = "";

    // Show the message if no meals found
    const noMeals = document.getElementById("no-found-message");
    if(meals === null){
        loadingSpinner(false);
        noMeals.classList.remove("d-none");
        showAll.classList.add("d-none");
    } else{
        noMeals.classList.add("d-none")
    }
    // get the Show All  button
    const showAll = document.getElementById("show-all")
    // display only 6 meals
    if (dataLimit && meals.length > 3){
        meals = meals.slice(0,3);
        showAll.classList.remove("d-none")
    }else{
        showAll.classList.add("d-none")
    }
    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("col");
        mealDiv.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card p-4 bg-success text-center text-white" data-bs-toggle="modal" data-bs-target="#meal-details-modal">
                <img class="w-75 m-auto rounded card-img-top" src="${meal.strMealThumb}" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${meal.strMeal}</h5>
                    <h5>Meal ID: ${meal.idMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,100)} </p>
                </div>
            </div>
        `;
        mealContainer.appendChild(mealDiv)
    });
    // stop spinner
    loadingSpinner(false);
}

// loading meal details
const loadMealDetails = async(mealId) => {
    const url = await `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
}

// display the meal details to the UI
const displayMealDetails = (meal) => {
    const mealTitle = document.getElementById("meal-title");
    const modaImage = document.getElementById("modal-img");
    const modalArea = document.getElementById("modal-area");
    const modalCategory = document.getElementById("modal-Category");
    const strTags = document.getElementById("modal-tags");
    mealTitle.innerText = meal.strMeal;
    modaImage.src = meal.strMealThumb;
    modalArea.innerText = meal.strArea;
    modalCategory.innerText = meal.strCategory;
    strTags.innerText = meal.strTags;
    console.log(meal);
}

const searchProcess = (dataLimit) => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadMeals(searchText, dataLimit)
}

const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById("loader");
    if(isLoading){
        spinner.classList.remove("d-none");
    } else{
        spinner.classList.add("d-none");
    }
}

// searching function
document.getElementById("search-btn").addEventListener("click", () => {
    searchProcess(3);
    loadingSpinner(true);
})
// Show all button
document.getElementById("show-all-btn").addEventListener("click", () => {
    searchProcess()
})

document.getElementById("search-field").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchProcess(3);
    }
})

loadMeals("")