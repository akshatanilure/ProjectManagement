let currentUser = null;

const products = {
  Cotton: [
    { id: 1, name: 'Cotton Saree 1', price: 1000 },
    { id: 2, name: 'Cotton Saree 2', price: 1200 },
  ],
  Silk: [
    { id: 3, name: 'Silk Saree 1', price: 2000 },
    { id: 4, name: 'Silk Saree 2', price: 2200 },
  ],
  Linen: [
    { id: 5, name: 'Linen Saree 1', price: 1500 },
    { id: 6, name: 'Linen Saree 2', price: 1700 },
  ]
};

function toggleSection(section) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(section).classList.remove('hidden');
  document.getElementById('shop-btn').classList.toggle('hidden', section !== 'login');
}

document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  if (username && password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    document.getElementById('signup-msg').textContent = 'Account created successfully! Please log in.';
    toggleSection('login');
  } else {
    document.getElementById('signup-msg').textContent = 'Please enter both username and password.';
  }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
    currentUser = { username };
    document.getElementById('login-msg').textContent = `Welcome, ${username}!`;
    toggleSection('shop');
  } else {
    document.getElementById('login-msg').textContent = 'Invalid credentials. Please try again.';
  }
});

function filterCategory(category) {
  const productList = products[category];
  const productContainer = document.getElementById('products');
  productContainer.innerHTML = '';
  productList.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
    `;
    productContainer.appendChild(productDiv);
  });
}
