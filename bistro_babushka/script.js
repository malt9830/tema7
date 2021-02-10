document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    loadJSON();
})

window.onscroll = function () {
    console.log("scroll");
    if (window.scrollY > 50) {
        document.querySelector("header").classList.add("active");
    } else {
        document.querySelector("header").classList.remove("active");
    }
}

let cuisine;
/*const peopleTitle = document.querySelector("#section_people h1");
const buttonFilters = document.querySelectorAll("nav button");
buttonFilters.forEach(button => button.addEventListener("click", filterPeople));

function filterPeople() {
    filter = this.dataset.troende;
    console.log(filter);

    document.querySelector(".selected").classList.remove("selected");
    this.classList.add("selected");

    showCuisine();
}*/

const url = "https://babushka-dd8a.restdb.io/rest/menu";
const media = "https://babushka-dd8a.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

async function loadJSON() {
    const JSONData = await fetch(url, options);
    cuisine = await JSONData.json();
    showCuisine();
}

function showCuisine() {
    console.log("showingCuisine");
    console.log(cuisine);
    const container = document.querySelector(".menu_grid");
    const template = document.querySelector("template");
    container.textContent = "";

    cuisine.forEach(dish => {
        let clone = template.cloneNode(true).content;
        clone.querySelector("img").src = media + dish.billede[0];
        clone.querySelector("img").alt = dish.navn;
        clone.querySelector("img").addEventListener("click", () => showDetails(dish));
        container.appendChild(clone);
    })
}

function showDetails(dish) {
    console.log("showingDetails");
    location.href = `dish.html?id=${dish._id}`;
}
