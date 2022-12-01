// printing utility
function print(value){
    console.log(value)
}

// web page utility
function createFoodItem(thumbnail, name){
    // div to contain the elements
    let rootDiv = document.createElement('div')

    // meal image
    let mealImage = document.createElement('img')
    mealImage.src = thumbnail
    mealImage.alt = `${name} image`
    mealImage.style.height = '200px'
    mealImage.style.width = '200px'

    // meal name
    let mealTitle = document.createElement('h5')
    mealTitle.innerHTML = name

    // append the image and text to root element
    rootDiv.append(mealImage)
    rootDiv.append(mealTitle)

    // return the element
    return rootDiv

}


// append item to an element
function appendElement(element, id = "app-body"){
    const rootElement = document.getElementById(id)
    rootElement.append(element)
}


// BASE URL FOR API
const MEAL_API = "https://www.themealdb.com/api/json/v1/1/"
const RADNOM_MEALS = `${MEAL_API}random.php`
const SEAFOOD = `${MEAL_API}filter.php?c=Seafood`


// function to load random meal
function loadRandomMeal(){
    //TODO: fill in the function
    const randomPromise = fetch(RADNOM_MEALS)
    randomPromise
        .then((response) => {return response.json()} )
        .then((data) => {
            const mealItem = data.meals[0]
            const htmlFoodItem = createFoodItem(mealItem.strMealThumb, 
                mealItem.strMeal)
            appendElement(htmlFoodItem, 'random-meal')
        })
}

// function to load list of seafoods
function loadSeafood(){
    // TODO: fill in the function
    const seafoodPromise = fetch(SEAFOOD)
    seafoodPromise
        .then((response) => response.json())
        .then((data) => {
            const meals = data.meals

            for(let i = 0; i < meals.length; i++){

                const mealItem = meals[i]
                const htmlFoodItem = createFoodItem(mealItem.strMealThumb, 
                    mealItem.strMeal)
                appendElement(htmlFoodItem, 'food-list') 

            }

        })

}


// wait for DOM to load to do stuff
document.addEventListener('DOMContentLoaded', (event) => {
    print(`Event loaded: ${event.type}`)

    // show random food
    loadRandomMeal()

    // show list of sea food
    loadSeafood()

    // BONUS: Add a button, add an event listener to it to reload the random image

})