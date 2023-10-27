///////////////////////////////////////////////////open//////////////////////////////////////////////
$(document).ready(function(){
    $(".lodingpage").fadeOut(1000,()=>{
        $("body").css("overflow","visible")
    })
})

///////////////////////////////////////////////////search//////////////////////////////////////////////
let nameOfSearch;
let letterOfSearch;

let searchName = document.querySelector("#searchName");
let searchLetter = document.querySelector("#searchLetter");
document.querySelector("#searchName").addEventListener("input",function(){
    getRandomMeal(this.value)

})

document.querySelector("#searchLetter").addEventListener("input",function(){
       console.log(this.value)
       getRandomMeal(this.value)
})
let searchLink = document.querySelector("#search");

searchLink.addEventListener("click",async ()=>{
    document.querySelector(".my-search").classList.remove("d-none")
    document.querySelector(".my-row").innerHTML="";

})

///////////////////////////////////////////////////home//////////////////////////////////////////////
let res;
let response;
let areaRes;
let ingredRes;

async function getRandomMeal(search=""){


    console.log(search)
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    res= await res.json();
    console.log("before hpmrMeals")
    console.log(  res.meals);
    displayHomePage(res.meals);


}

function displayHomePage(arr){
    let cartona="";
    for(let i = 0 ; i<res.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsPage (${i})">
        <div>
            <img src="${res.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${res.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}
getRandomMeal()

///////////////////////////////////////////////////navbar//////////////////////////////////////////////
$(".openbtn").click(()=>{
    $("nav").removeClass("nav-out")
    $("nav").addClass("nav-in")
    $(".nav-top-links").addClass("animate__fadeInDown")
    $(".nav-top-links").removeClass("animate__fadeOutUp")

    $(".closebtn").removeClass("d-none")
    $(".openbtn").addClass("d-none")
})

$(".closebtn").click(()=>{

    $("nav").removeClass("nav-in")
    $("nav").addClass("nav-out")
    $(".nav-top-links").removeClass("animate__fadeInDown")
    $(".nav-top-links").addClass("animate__fadeOutUp")
    $(".closebtn").addClass("d-none")
    $(".openbtn").removeClass("d-none")

    
})

$("#searchName").ready(function(){
    $(".lodingpage").fadeOut(1000)
})
///////////////////////////////////////////////////category//////////////////////////////////////////////
let categoriesLink = document.querySelector("#categories");
async function grtCategoryApi(){
    response =  await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();
    console.log(response.categories)
    displayCategoryPage(response.categories)
}

function displayCategoryPage(arr){
    let cartona="";
    for(let i = 0 ; i<response.categories.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal">
        <div>
            <img src="${response.categories[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 overflow-hidden d-flex flex-column justify-content-center align-items-center ">
            <span class="fs-3 fw-medium mx-2">${response.categories[i].strCategory}</span>
            <p class="categoryDDesc mx-3  text-center"> ${response.categories[i].strCategoryDescription}</p>
            
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}

categoriesLink.addEventListener("click",()=>{
    grtCategoryApi()
    document.querySelector(".my-search").classList.add("d-none")

})

$("#categories").ready(function(){
    $(".lodingpage").fadeOut(1000)
})
///////////////////////////////////////////////////area//////////////////////////////////////////////
let areaLink = document.querySelector("#area");
async function getAreaApi(){
    areaRes =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    areaRes = await areaRes.json();
    console.log(areaRes.meals)
    displayAreaPage(areaRes.meals)
}

function displayAreaPage(arr){
    let cartona="";
    for(let i = 0 ; i<areaRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal">
        <div class="d-flex flex-column justify-content-center align-items-center text-white">
        <i class="fa-solid fa-house-laptop fs-1 fw-bolder areaIcon"></i>
        <span class=" mx-3 fs-3">${areaRes.meals[i].strArea}</span>

        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}


$("#area").ready(function(){
    $(".lodingpage").fadeOut(1000)
})
areaLink.addEventListener("click",()=>{
    getAreaApi()
    document.querySelector(".my-search").classList.add("d-none")

})
///////////////////////////////////////////////////ingridants//////////////////////////////////////////////
let ingredientsLink =document.querySelector("#ingredients");
async function getIngredientsApi(){
    ingredRes =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    ingredRes = await ingredRes.json();
    console.log(ingredRes.meals)
    displayIngredientsPage(ingredRes.meals)
}

function displayIngredientsPage(arr){
    let cartona="";
    for(let i = 0 ; i<20; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal">
        <div class="d-flex flex-column justify-content-center align-items-center text-white text-center">
        <i class="fa-solid fa-drumstick-bite fs-1 fw-bolder areaIcon"></i>
        <span class=" mx-3 fs-4 fw-bold">${ingredRes.meals[i].strIngredient}</span>
        <p class="ingrediantDesc py-3">${ingredRes.meals[i].strDescription}</p>

        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}

$("#ingredients").ready(function(){
    $(".lodingpage").fadeOut(1000)
})
ingredientsLink.addEventListener("click",()=>{
    getIngredientsApi()
    document.querySelector(".my-search").classList.add("d-none")

})
///////////////////////////////////////////////////details//////////////////////////////////////////////
function displayDetailsPage(i) {
    if (!res.meals || !res.meals[i]) {
        // No information available from the API, handle accordingly (e.g., display an error message)
        document.querySelector(".my-row").innerHTML = "<p>No information available for this meal.</p>";
        return;
    }

    let cartona = `
        <div class="container detealsPage my-1">
            <div class="row ps-3">
                <div class="col-lg-4 text-white">
                    <img src="${res.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <h2 class="mt-1">${res.meals[i].strMeal}</h2>
                </div>
                <div class="col-lg-8 text-white">
                    <h2 class="fw-bold">Instructions</h2>
                    <p>${res.meals[i].strInstructions}</p>
    
                    <p class="fs-3 fw-bold">Area : <span class="fw-medium">${res.meals[i].strArea}</span></p>
                    <p class="fs-3 fw-bold">Category : <span class="fw-medium">${res.meals[i].strCategory}</span></p>
                    <p class="fs-3 fw-medium">Recipes :</p>
                    
                    <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                        ${createIngredientList(res.meals[i])}
                    </ul>
    
                    <p class="fs-3 fw-medium">Tags :</p>
                    <p class="type">Soup</p>
    
                    <ul class="list-unstyled d-flex ingradSrc gap-2">
                        <li class="scr"><a href="${res.meals[i].strSource}" class="text-decoration-none text-white" target="_blank">Source</a></li>
                        <li class="yout"><a href="${res.meals[i].strYoutube}" class="text-decoration-none text-white" target="_blank">Youtube</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.querySelector(".my-row").innerHTML = cartona;
}

function createIngredientList(meal) {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientList;
}



///////////////////////////////////////////////////contact us//////////////////////////////////////////////
let contactLink=document.querySelector(".contact");

$("#contact").ready(function(){
    $(".lodingpage").fadeOut(1000)
})

let nameRegex = /^[A-Z]\w{0,20}$/;
let emailRegex=/^([\w-]+(?:\.[\w-]+))@((?:[\w-]+\.)\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
let phoneRegex=/^01[0125][0-9]{8}$/;
let ageRegex =/^[1-9]?[0-9]{1}$|^100$/;
let passRegex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;

function validation(regex,input){
    if(regex.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        console.log("right")
        // input.parentElement.nextElementSibling.classList.add("d-none") ;

        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        console.log("wrong")
        // input.parentElement.nextElementSibling.classList.remove("d-none") ;
        return false;
    }
}

let rePassword = document.getElementById("Repassword");
let passInput = document.getElementById("passInput");
let ageInput = document.getElementById("ageInput");
let phoneInput =document.getElementById("phoneInput");
let emailInput = document.getElementById("emailInput");
let nameInput = document.getElementById("nameInput");





nameInput.addEventListener("input",function(){
    if(validation(nameRegex,nameInput)){
        document.querySelector(".name-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".name-validation").classList.remove("d-none")

    }
})
emailInput.addEventListener("input",function(){
    if(validation(emailRegex,emailInput)){
        document.querySelector(".email-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".email-validation").classList.remove("d-none")

    }
})
phoneInput.addEventListener("input",function(){
    if(validation(phoneRegex,phoneInput)){
        document.querySelector(".phone-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".phone-validation").classList.remove("d-none")

    }
})
ageInput.addEventListener("input",function(){
    if(validation(ageRegex,ageInput)){
        document.querySelector(".age-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".age-validation").classList.remove("d-none")

    }
})
passInput.addEventListener("input",function(){
    if(validation(passRegex,passInput)){
        document.querySelector(".pass-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".pass-validation").classList.remove("d-none")

    }
})

rePassword.addEventListener("input",function(){
    if(passInput.value == rePassword.value){
        document.querySelector(".rePass-validation").classList.add("d-none")
        console.log("hi")
    }
    else{
        document.querySelector(".rePass-validation").classList.remove("d-none")
        console.log("gggg")
    }
})





const contactInputs = document.querySelectorAll(".contact-input");
const contactBtn = document.getElementById("contact-btn");

function checkInputs() {
  let allInputsFilled = true;

  contactInputs.forEach(input => {
    if (input.value === "") {
      allInputsFilled = false;
    }
  });

  contactBtn.disabled = !allInputsFilled;
}

contactInputs.forEach(contactInputs => {
    contactInputs.addEventListener("input", checkInputs);
});

document.querySelector("#contact").addEventListener("click",()=>{
    document.querySelector(".my-main-page").classList.add("d-none");
    document.querySelector(".my-contact-us").classList.remove("d-none");
    
})



// async function areaMealsApi(area){
//     areaMealsRes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
//     areaMealsRes = await areaMealsRes.json();
//     console.log(areaMealsRes.meals)
//     displayInnerArea(areaMealsRes.meals)
// }
// function displayInnerArea(){ 
//     let cartona="";
//     for(let i = 0 ; i<areaMealsRes.meals.length; i++ ){
//         cartona+=`
//         <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsArea (${i})">
//         <div>
//             <img src="${areaMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
//         </div>
//         <div class="overlay position-absolute rounded-3 d-flex align-items-center">
//             <span class="fs-3 fw-medium mx-2">${areaMealsRes.meals[i].strMeal }</span>
//         </div>
//     </div>
//         `
//     }
//     document.querySelector(".my-row").innerHTML=cartona;
// }
// function displayDetailsArea (i){
//     let  cartona = `
//     <div class="container detealsPage my-1">
//     <div class="row ps-3">
//         <div class="col-lg-4 text-white">
//             <img src="${areaMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
//             <h2 class="mt-1">${areaMealsRes.meals[i].strMeal}</h2>
//         </div>
//         <div class="col-lg-8 text-white">
//             <h2 class="fw-bold">Instructions</h2>
//             <p>${areaMealsRes.meals[i].strInstructions}</p>

//             <p class="fs-3 fw-bold">Area : <span class="fw-medium">${areaMealsRes.meals[i].strArea}</span></p>
//             <p class="fs-3 fw-bold">Category : <span class="fw-medium">${areaMealsRes.meals[i].strCategory}</span></p>
//             <p class="fs-3 fw-medium" >Recipes :</p>
            
            
//             <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
//                 ${ingradList(areaMealsRes.meals[i]) }
//             </ul>

//             <p class="fs-3 fw-medium" >Tags :</p>
//             <p class="type">Soup</p>

//             <ul class="list-unstyled d-flex ingradSrc gap-2">
//                 <li class="scr"> <a href="${areaMealsRes.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
//                 <li class="yout"><a href="${areaMealsRes.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
//             </ul>
//         </div>
//     </div>

// </div>
//         `;
    

//     document.querySelector(".my-row").innerHTML=cartona;

// }



