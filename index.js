import specialDishes from "./data/cousine.js";

const dishCardContainer = document.getElementsByClassName(
  "dish-card-container"
);

specialDishes?.slice(0, specialDishes.length - 1).forEach((d) => {
  dishCardContainer[0].innerHTML += `
    <div class="dish-card">
      <img src=${d.url} class="img" />
      <div class="options" style="display: none;">
        <button type="button" class="button_favourites">Add2Favourite</button>
        <button type="button" class="button_cart">Add2Cart</button>
        <div class="header">${d.name}</div>
      </div>
    </div>`;
});

const dishCards = document.getElementsByClassName("dish-card");

Array.from(dishCards).forEach((d) => {
  d.addEventListener("mouseover", () => {
    d.querySelector(".options").style.display = "block";
  });

  d.addEventListener("mouseout", () => {
    d.querySelector(".options").style.display = "none";
  });
});
