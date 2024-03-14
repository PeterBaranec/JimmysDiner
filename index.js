import { menuArray } from "./data.js";

// Render Menu
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

// Make new array for cart
const selectedItems = [];

// Function to render selectedItems array
function renderSelectedItems(selectedItems) {
  const selectedItemsHTML = selectedItems
    .map((item) => {
      return `
      <div class="shopping-list__cart">
        <div class="flex">
          <h1 class="shopping-list__title">${item.name}</h1>
          <a class="item-btn" data-item="${item.id}">Remove</a>
        </div>
        <p class="menu__price">${item.price}</p>
      </div>
    `;
    })
    .join("");

  return selectedItemsHTML;
}

// Function to calculate total price
function calculateTotalPrice(selectedItems) {
  let totalPrice = 0;
  selectedItems.forEach((selectedItem) => (totalPrice += selectedItem.price));
  return `
    <div class="summary__price" id="summary-price">
      <h1 class="price-title">Total price: </h1>
      <p>${totalPrice}</p>
    </div>
  `;
}

// Function to add event listeners to Remove buttons
function addRemoveEventListeners() {
  const removeButtonElements = document.querySelectorAll(".item-btn");
  removeButtonElements.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = button.dataset.item;
      const index = selectedItems.findIndex((item) => item.id == itemId);
      if (index !== -1) {
        selectedItems.splice(index, 1);
        updateSelectedItems();
      }
    });
  });
}

//Function to update HTML if there is no item in selectedItems array
function toggleOrderVisibility() {
  const orderSummary = document.getElementById("order-summary");
  selectedItems.length > 0
    ? orderSummary.classList.remove("hidden")
    : orderSummary.classList.add("hidden");
}

// Function to update selected items and total price
function updateSelectedItems() {
  document.getElementById("shopping-list").innerHTML =
    renderSelectedItems(selectedItems);
  document.getElementById("summary").innerHTML =
    calculateTotalPrice(selectedItems);
  addRemoveEventListeners(); // Add event listeners after rendering selected items
  toggleOrderVisibility();
}

// Iterate over Add buttons and add corresponding items to the list
const addButtonElements = document.querySelectorAll(".button_plus");
addButtonElements.forEach((button) => {
  button.addEventListener("click", function () {
    const itemId = button.dataset.item;
    const selectedItem = menuArray.find((item) => item.id == itemId);
    if (selectedItem) {
      selectedItems.push(selectedItem);
      updateSelectedItems();
    }
  });
});

//After clicking complete order show form
const summaryBtn = document.getElementById("summary-btn");
summaryBtn.addEventListener("click", function () {
  const form = document.getElementById("form");
  form.classList.remove("hidden");
});

//After clicking Pay button show messgae to the user
const formBtn = document.getElementById("form-btn");
formBtn.addEventListener("click", function () {
  const userName = document.getElementById("user-name").value;
  const form = document.getElementById("form");
  form.classList.add("hidden");
  updatePayment(userName);
});

//Render payment HTML
function updatePayment(userName) {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = `
  <p class="order-message">Thanks, ${userName}! Your order is on its way!</p>
  `;
  return orderSummary;
}

// Initially attach event listeners to Remove buttons
addRemoveEventListeners();
