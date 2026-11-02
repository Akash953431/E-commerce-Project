const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 1499, emoji: "🎧" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 2199, emoji: "⌚" },
  { id: 3, name: "Everyday Backpack", category: "Fashion", price: 999, emoji: "🎒" },
  { id: 4, name: "Classic Sneakers", category: "Fashion", price: 1799, emoji: "👟" },
  { id: 5, name: "Desk Lamp", category: "Home", price: 799, emoji: "💡" },
  { id: 6, name: "Coffee Mug Set", category: "Home", price: 499, emoji: "☕" },
  { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 1299, emoji: "🔊" },
  { id: 8, name: "Travel Bottle", category: "Home", price: 349, emoji: "🧴" }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function displayProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p class="empty-results">No products found. Try another search.</p>';
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">${product.emoji}</div>
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <div class="product-bottom">
        <span class="product-price">${formatPrice(product.price)}</span>
        <button class="add-button" data-product-id="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(item => item.id === productId);
    if (product) cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;
  item.quantity += amount;
  cart = cart.filter(product => product.quantity > 0);
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Add a product to get started!</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-art" aria-hidden="true">${item.emoji}</div>
      <div>
        <h3>${item.name}</h3>
        <p>${formatPrice(item.price)} each</p>
        <div class="quantity-controls">
          <button data-action="decrease" data-product-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button>
          <button class="remove-button" data-action="remove" data-product-id="${item.id}">Remove</button>
        </div>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>
  `).join("");
}

function openCart() {
  document.body.classList.add("cart-open");
  document.getElementById("cart-panel").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  document.getElementById("cart-panel").setAttribute("aria-hidden", "true");
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  if (button) addToCart(Number(button.dataset.productId));
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const productId = Number(button.dataset.productId);
  const action = button.dataset.action;
  if (action === "increase") changeQuantity(productId, 1);
  if (action === "decrease") changeQuantity(productId, -1);
  if (action === "remove") removeFromCart(productId);
});

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);
document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("cart-backdrop").addEventListener("click", closeCart);

document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add a product first.");
    return;
  }
  alert("Thank you! This is a demo checkout. No payment has been processed.");
});

displayProducts();
updateCart();