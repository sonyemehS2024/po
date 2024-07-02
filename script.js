var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search"); //the actualy search bar
var bottomHalf = document.getElementById("bottom-half");
var bottomHalf2 = document.getElementById("bottom-half2"); //the new bottom half that appears

var whole = document.getElementById("whole");
var back = document.getElementById("back");

var topHalf = document.getElementById("top-half");
var header = document.getElementById("header");

var chicken = document.getElementById("chicken");
var beef = document.getElementById("beef");
var salad = document.getElementById("salad");
var fish = document.getElementById("fish");

var lowFat = document.getElementById("low-fat");
var lowCarb = document.getElementById("low-carb");
var balance = document.getElementById("balanced");
var veggie = document.getElementById("veggie");

var health = '';
var pre = '';

var row = document.getElementById("row-spec"); //the specific row where all the things go

const appId = '00f9f904';
const appKey = '362791f2ed9d38eb2304a89502e5795b';

console.log(searchForm);

searchForm.addEventListener("submit", get);

chicken.addEventListener("click", getChicken);
beef.addEventListener("click", getBeef);
salad.addEventListener("click", getSalad);
fish.addEventListener("click", getFish);

back.addEventListener("click", function(){
    console.log("back");
    
    

    if (row.firstChild.classList.contains('col-sm-6')) {
        console.log("sjdkjdjkd here?");
        get(event); 
    }

    else if (bottomHalf2.style.display === "initial"){
        back.style.display = "none";
        bottomHalf2.style.display = "none";
        bottomHalf.style.display = "initial";
        topHalf.style.paddingTop = "3vw";
        header.style.display = "none";

        searchInput.value = '';

        console.log("well it's true");
    }

});

function get(event){ //this function is called when the search button is submitted and it renders what you searched
   
    event.preventDefault();
    
    console.log(health);
    row.innerHTML = '';    //clears things when you serach

    console.log("confirm");

    var input = searchInput.value; //this is the search input
    

    var xhttp = new XMLHttpRequest();
    
    // Response handler
    xhttp.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var recipes = JSON.parse(this.responseText);
            console.log(recipes);
            for (i = 0; i < recipes.hits.length; i++){  //the hits are different recipes
                render(recipes.hits[i]);
           }
            
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    buttons();
    
    xhttp.open("GET", `https://api.edamam.com/api/recipes/v2/?q=${input}&app_id=${appId}&app_key=${appKey}&type=public${pre + health}`, true); //All API request call urls were provided by Edamam as well ass all content recieved from it https://developer.edamam.com/edamam-docs-recipe-api 

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "362791f2ed9d38eb2304a89502e5795b");
    xhttp.send();
    
}

function render(object){
    console.log("render");

    header.style.display = "flex";
    back.style.display = "initial";
    
    bottomHalf2.style.display = "initial";

    topHalf.style.paddingTop = "0px";

    row.style.display= "flex";
    bottomHalf.style.display = "none"; //clears what was there

   
    var col = document.createElement("div");

    var recipeDiv = document.createElement("div"); //contains one singles recipe card

    var recLabel = document.createElement("h3"); //recipe label what is it called?
    var recLabelInside = document.createTextNode(object.recipe.label); //recipe label

    var calorie = document.createElement("p");


    var calorieInside = document.createTextNode("Calories: ");
    var calorieInside2 = document.createTextNode(Math.round(object.recipe.calories));

    var image = document.createElement("img");

    col.setAttribute("class", "col-sm-3");
    image.setAttribute("src", object.recipe.image);
    image.setAttribute("class", "food");

    recipeDiv.setAttribute("class", "one-recipe");

    recLabel.setAttribute("class", "head");

    recLabel.onmouseenter = function(){
        recLabel.style.cursor = "pointer";
        recLabel.style.color = "chocolate";
    }

    recLabel.onmouseleave = function(){
        recLabel.style.cursor = "default";
        recLabel.style.color = "#300a18";
    }

    recLabel.addEventListener("click", function(){

        console.log("it was clicked");
        renderOne(object);
    } )

    calorie.setAttribute("class", "label");
    
    row.appendChild(col);

    col.appendChild(recipeDiv);
    recipeDiv.appendChild(recLabel);
    recLabel.appendChild(recLabelInside);
    recipeDiv.appendChild(image);

    var bold2 = document.createElement("strong");

    recipeDiv.appendChild(calorie);
    calorie.appendChild(bold2);
    bold2.appendChild(calorieInside);
    calorie.appendChild(calorieInside2);

    var tags = document.createElement("p");

    tags.setAttribute("class", "label");
    
    var tagsInside = document.createTextNode("Tags: ")

    var bold = document.createElement("strong");

    recipeDiv.appendChild(tags);
    tags.appendChild(bold);
    bold.appendChild(tagsInside);

    for (j = 0; j < object.recipe.healthLabels.length; j++){ 
        if (j < object.recipe.healthLabels.length-1){
            var healthInside = document.createTextNode(object.recipe.healthLabels[j] + ", ");
            tags.appendChild(healthInside);
        }

        else{
            var healthInside = document.createTextNode(object.recipe.healthLabels[j] + ".");
            tags.appendChild(healthInside);
        }
    }

}

function renderOne(object){
    console.log("it's here");

    console.log("render");
    

    //bottomHalf.style.display = "none"; //clears what was there
    row.innerHTML = '';  //clears what was in the html
    
    var col = document.createElement("div");
    var col2 = document.createElement("div");

    var recipeDiv = document.createElement("div"); //contains one singles recipe card
    var ingredDiv = document.createElement("div"); //for the ingredients
    
    var urlDiv = document.createElement("div"); //for the url to get the recipe

    var recLabel = document.createElement("h3"); //recipe label what is it called?
    var recLabelInside = document.createTextNode(object.recipe.label); //recipe label

    var ingredTitle = document.createElement("h3");
    var ingredInside = document.createTextNode("Ingredients:");

    var instr = document.createElement("a");
    var instrInside = document.createTextNode(object.recipe.url);

    var instrLabel = document.createElement("p");
    var instrLabelInside = document.createTextNode("Recipe: ");

    instrLabel.setAttribute("class", "label");

    var bold3 = document.createElement("strong");

    instr.setAttribute("href", object.recipe.url);
    instr.setAttribute("class", "label link");

    var calorie = document.createElement("p");

    var calorieInside = document.createTextNode("Calories: ");
    var calorieInside2 = document.createTextNode(Math.round(object.recipe.calories));

    var image = document.createElement("img");

    col.setAttribute("class", "col-sm-6");
    col2.setAttribute("class", "col-sm-4");

    image.setAttribute("src", object.recipe.image);
    image.setAttribute("class", "food");

    recipeDiv.setAttribute("class", "one-recipe full");

    ingredDiv.setAttribute("class", "one-recipe ingred");

    recLabel.setAttribute("class", "head");
    ingredTitle.setAttribute("class", "head");


    calorie.setAttribute("class", "label");

    row.appendChild(col);
    row.appendChild(col2);

    col.appendChild(recipeDiv);
    col2.appendChild(ingredDiv);

    recipeDiv.appendChild(recLabel);
    recLabel.appendChild(recLabelInside);
    recipeDiv.appendChild(image);

    ingredDiv.appendChild(ingredTitle);
    ingredTitle.appendChild(ingredInside);

    var bold2 = document.createElement("strong");

    recipeDiv.appendChild(calorie);
    calorie.appendChild(bold2);
    bold2.appendChild(calorieInside);
    calorie.appendChild(calorieInside2);

    var tags = document.createElement("p");

    tags.setAttribute("class", "label");
    
    var tagsInside = document.createTextNode("Tags: ")

    var bold = document.createElement("strong");

    recipeDiv.appendChild(tags);
    tags.appendChild(bold);
    bold.appendChild(tagsInside);

    recipeDiv.appendChild(instrLabel);
    instrLabel.appendChild(bold3);
    bold3.appendChild(instrLabelInside);
    recipeDiv.appendChild(instr);
    instr.appendChild(instrInside);

    for (x = 0; x < object.recipe.healthLabels.length; x++){ 
        if (x < object.recipe.healthLabels.length-1){
            var healthInside = document.createTextNode(object.recipe.healthLabels[x] + ", ");
            tags.appendChild(healthInside);
        }

        else{
            var healthInside = document.createTextNode(object.recipe.healthLabels[x] + ".");
            tags.appendChild(healthInside);
        }
    }


    for (q = 0; q < object.recipe.ingredientLines.length; q++){
        var ingredients = document.createElement("p");
        var ingredientsInside = document.createTextNode(object.recipe.ingredientLines[q]);

        ingredDiv.appendChild(ingredients);
        ingredients.appendChild(ingredientsInside);
   }

    // back.addEventListener("click", function(){
    //     console.log(bottomHalf2.style.display);
    //     //back.style.display = "none";

    //     if (bottomHalf2.style.display === "intial"){
    //         get(event);
    //     }
         
    // });


}

function getChicken(event){
    
    event.preventDefault();

    row.innerHTML = '';    //clears things when you serach

    console.log("confirm2");

    var input2 = "chicken";
    searchInput.value = "chicken"; //clears seachbar

    var xhttp2 = new XMLHttpRequest();
    
    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var recipes = JSON.parse(this.responseText);

            console.log(recipes);
            for (k = 0; k < recipes.hits.length; k++){  //the hits are different recipes
                render(recipes.hits[k]);
           }
            
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    buttons();

    xhttp2.open("GET", `https://api.edamam.com/api/recipes/v2/?q=${input2}&app_id=${appId}&app_key=${appKey}&type=public`, true); //All API request call urls were provided by Edamam as well as all content recieved from it https://developer.edamam.com/edamam-docs-recipe-api 

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "362791f2ed9d38eb2304a89502e5795b");
    xhttp2.send();
}

function getFish(event){
    
    event.preventDefault();

    row.innerHTML = '';    //clears things when you serach

    console.log("confirm2");

    var input2 = "fish";
    searchInput.value = "fish"; //clears seachbar

    var xhttp2 = new XMLHttpRequest();
    
    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var recipes = JSON.parse(this.responseText);

            console.log(recipes);
            for (c = 0; c < recipes.hits.length; c++){  //the hits are different recipes
                render(recipes.hits[c]);
           }
            
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    buttons();

    xhttp2.open("GET", `https://api.edamam.com/api/recipes/v2/?q=${input2}&app_id=${appId}&app_key=${appKey}&type=public`, true); //All API request call urls were provided by Edamam as well as all content recieved from it https://developer.edamam.com/edamam-docs-recipe-api 

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "362791f2ed9d38eb2304a89502e5795b");
    xhttp2.send();
}

function getBeef(event){
    
    event.preventDefault();

    row.innerHTML = '';    //clears things when you serach

    console.log("confirm2");

    var input3 = "beef";
    searchInput.value = "beef"; //clears seachbar

    var xhttp2 = new XMLHttpRequest();
    
    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var recipes = JSON.parse(this.responseText);

            console.log(recipes);
            for (b = 0; b < recipes.hits.length; b++){  //the hits are different recipes
                render(recipes.hits[b]);
           }
            
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    buttons();

    xhttp2.open("GET", `https://api.edamam.com/api/recipes/v2/?q=${input3}&app_id=${appId}&app_key=${appKey}&type=public`, true); //All API request call urls were provided by Edamam as well as all content recieved from it https://developer.edamam.com/edamam-docs-recipe-api 

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "362791f2ed9d38eb2304a89502e5795b");
    xhttp2.send();
}

function getSalad(event){
    
    event.preventDefault();

    row.innerHTML = '';    //clears things when you serach

    console.log("confirm2");

    var input4 = "salad";
    searchInput.value = "salad"; //clears seachbar

    var xhttp2 = new XMLHttpRequest();
    
    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var recipes = JSON.parse(this.responseText);

            console.log(recipes);
            for (v = 0; v < recipes.hits.length; v++){  //the hits are different recipes
                render(recipes.hits[v]);
           }
            
            
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    buttons();

    xhttp2.open("GET", `https://api.edamam.com/api/recipes/v2/?q=${input4}&app_id=${appId}&app_key=${appKey}&type=public`, true); //All API request call urls were provided by Edamam as well as all content recieved from it https://developer.edamam.com/edamam-docs-recipe-api 

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "362791f2ed9d38eb2304a89502e5795b");
    xhttp2.send();
}

function buttons(){

    lowFat.addEventListener("click", function(){
        console.log("lowfat");
        pre = "&diet=";
        health = "low-fat";
        console.log(health);
        get(event);
    });

    lowCarb.addEventListener("click", function(){
        console.log("lowcarb");
        pre = "&diet=";
        health = "low-carb";
        console.log(health);
        get(event);
    });

    veggie.addEventListener("click", function(){
        console.log("veggie");
        pre = "&health=";
        health = "vegetarian";
        console.log(health);
        get(event);
    });

    balance.addEventListener("click", function(){
        console.log("lowftasghdjdn");
        pre = "&diet=";
        health = "balanced";
        console.log(health);
        get(event);
    });
}
