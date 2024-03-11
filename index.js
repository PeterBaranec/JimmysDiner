import { menuArray } from "./data.js";

//Render Menu
function renderMenu(menu) {
  const menuItems = menu
    .map((menu) => {
      return `
         <div class="menu__item">
                    <div class="flex">
                        <img class="menu__icon" src="./images/${menu.image}" alt="hamburger">
                        <div>
                            <h1 class="menu__title">${menu.name}</h1>
                            <p class="menu__ingredients">${menu.ingredients}</p>
                            <p class="menu__price">${menu.price}</p>
                        </div>
                    </div>
                    <div>
                        <a class="button_plus" id="menu-button" data-item="${menu.id}"></a>
                    </div>
                </div>
        `;
    })
    .join("");

  return menuItems;
}

document.getElementById("menu").innerHTML = renderMenu(menuArray);

//Make new array for cart
const selectedItems = [];

const addButtonElements = document.querySelectorAll(".button_plus");
addButtonElements.forEach((button) => {
  button.addEventListener("click", function () {
    const itemId = button.dataset.item;
    console.log(itemId);
    const selectedItem = menuArray.find((item) => item.id == itemId);
    if (selectedItem) {
      selectedItems.push(selectedItem);
      //render selectedItems array every time we add a new item
      document.getElementById("shopping-list").innerHTML =
        renderSelectedItems(selectedItems);
      console.log("Selected items:", selectedItems);
    }
  });
});

//render selectedItems array
function renderSelectedItems(selectedItems) {
  const selectedItemsHTML = selectedItems
    .map((item) => {
      return `
      <h1>Cart</h1>
      <div class="selected-item">
        <img class="menu__icon" src="./images/${item.image}" alt="${item.name}">
        <div>
          <h1 class="menu__title">${item.name}</h1>
           <a id="item-button" data-item="${item.id}">Remove</a>
          <p class="menu__ingredients">${item.ingredients}</p>
          <p class="menu__price">${item.price}</p>
        </div>
      </div>
    `;
    })
    .join("");

  return selectedItemsHTML;
}

document.getElementById("shopping-list").innerHTML =
  renderSelectedItems(selectedItems);
