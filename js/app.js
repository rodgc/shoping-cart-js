(function () {
  let menuData = {
    "2342153": {
      productName: "Mouse",
      price: 199,
    },

    "12364324": {
      productName: "Keyboard",
      price: 699,
    },

    "7893424": {
      productName: "AMD CPU",
      price: 6999,
    },
  };

  let cartData = {};

  let menuArea = document.getElementById("menu-area");

  let cartList = document.getElementById("cart-list");
  let totalAmount = document.getElementById("total-amount");

  let setMenu = function () {
    for (let sku in menuData) {
      let menuItem = createMenuItem(sku);
      menuArea.appendChild(menuItem);
    }
  };

  let createMenuItem = function (sku) {
    let data = menuData[sku];

    let menuItem = document.createElement("div");
    menuItem.className = "menu-item";

    let menuText = document.createElement("span");
    menuText.className = "menu-text";
    menuText.innerText = data.productName + " - " + "$" + data.price;

    let menuActionSpan = document.createElement("span");
    menuActionSpan.className = "menu-action";

    let menuActionButton = document.createElement("button");
    menuActionButton.innerText = "+";
    menuActionButton.setAttribute("data-sku", sku);

    menuActionButton.onclick = addToCart;

    menuActionSpan.appendChild(menuActionButton);

    menuItem.appendChild(menuText);
    menuItem.appendChild(menuActionSpan);

    return menuItem;
  };

  let addToCart = function (e) {
    let button = e.target;
    let sku = button.getAttribute("data-sku");

    if (sku in cartData) cartData[sku] += 1;
    else cartData[sku] = 1;

    setCart();
  };

  let reduceCartCount = function (e) {
    let button = e.target;
    let sku = button.getAttribute("data-sku");

    if (sku in cartData) {
      cartData[sku] -= 1;

      if (cartData[sku] < 1) delete cartData[sku];
    }

    setCart();
  };

  let setCart = function () {
    cartList.innerHTML = "";

    let total = 0;
    for (let sku in cartData) {
      let details = menuData[sku];
      let qty = cartData[sku];

      let cartItem = createCartItem(sku);

      total += qty * details.price;
      cartList.appendChild(cartItem);
    }

    totalAmount.innerText = total;
  };

  let createCartItem = function (sku) {
    let data = menuData[sku];
    let qty = cartData[sku];

    let cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";

    let itemText = document.createElement("span");
    itemText.className = "item-text";
    itemText.innerText = data.productName + " x " + qty;

    let itemTotal = document.createElement("span");
    itemTotal.className = "item-total";
    itemTotal.innerText = "$" + data.price * qty;

    let removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.innerText = "-";
    removeButton.setAttribute("data-sku", sku);
    removeButton.onclick = reduceCartCount;

    cartItemDiv.appendChild(itemText);
    cartItemDiv.appendChild(itemTotal);
    cartItemDiv.appendChild(removeButton);

    return cartItemDiv;
  };

  setMenu();
})();
