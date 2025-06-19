// Initialize cart from localStorage or set to an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the navigation
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Add item to cart
function addToCart(id, name, price) {
  // Check if item is already in the cart
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    // If item exists, increase quantity
    existingItem.quantity++;
  } else {
    // If item doesn't exist, add new item
    cart.push({ id, name, price, quantity: 1 });
  }
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Remove item from cart
function removeFromCart(id) {
  // Filter out the item with the specified id
  cart = cart.filter(item => item.id !== id);
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Update item quantity in cart
function updateItemQuantity(id, quantity) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}

// Display cart items
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear existing items

  // Display each item in the cart
  cart.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity(${item.id}, this.value)">
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  // Update total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById('total-price').textContent = `Total: ₹${totalPrice}`;
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  displayCart();
});
