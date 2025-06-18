const products = [
    { id: 1, name: "Elegant Cotton Saree", price: 1500, category: "Cotton" },
    { id: 2, name: "Royal Silk Saree", price: 3000, category: "Silk" },
    { id: 3, name: "Chic Linen Saree", price: 2000, category: "Linen" },
    { id: 4, name: "Designer Cotton Saree", price: 1800, category: "Cotton" },
    { id: 5, name: "Luxury Silk Saree", price: 3500, category: "Silk" },
  ];
  
  let cart = [];
  
  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (id === 'shop') displayProducts(products);
    if (id === 'cart') updateCart();
  }
  
  function createAccount() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username, password }));
      document.getElementById("signup-msg").textContent = "Account created!";
    } else {
      document.getElementById("signup-msg").textContent = "Please enter all fields.";
    }
  }
  
  function filterCategory(cat) {
    const filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
  }
  
  function displayProducts(items) {
    const container = document.getElementById("products");
    container.innerHTML = '';
    items.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById("cart-count").textContent = cart.length;
  }
  
  function updateCart() {
    const list = document.getElementById("cart-items");
    list.innerHTML = '';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₹${item.price}`;
      const btn = document.createElement('button');
      btn.textContent = "Remove";
      btn.onclick = () => removeFromCart(index);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    document.getElementById("cart-count").textContent = cart.length;
  }
  
  function placeOrder() {
    if (cart.length === 0) {
      document.getElementById("order-msg").textContent = "Your cart is empty.";
      return;
    }
    alert("Order placed successfully!");
    cart = [];
    document.getElementById("cart-count").textContent = 0;
    updateCart();
    document.getElementById("order-msg").textContent = "Thank you for your order!";
  }
  