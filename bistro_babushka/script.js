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

    cuisine.forEach(dish => {
        const template = document.querySelector("template");
        let filter = `.cat_${dish.kategori}`;
        let container = document.querySelector(filter);
        let clone = template.cloneNode(true).content;
        clone.querySelector("img").src = media + dish.billede[0];
        clone.querySelector("img").alt = dish.navn;
        clone.querySelector("article").addEventListener("click", () => showDetails(dish));
        clone.querySelector(".name").textContent = dish.navn;
        clone.querySelector(".price").textContent = `${dish.pris},-`;
        clone.querySelector(".description").textContent = dish.kortbeskrivelse;

        container.appendChild(clone);
    })
}

function showDetails(dish) {
    console.log("showingDetails");
    location.href = `dish.html?id=${dish._id}`;
}
