const products = [
    {
      id: 1,
      name: "Elegant Cotton Saree",
      price: 1500,
      category: "Cotton",
      image: "https://5.imimg.com/data5/YD/FW/AB/ANDROID-41703119/product-jpeg-500x500.jpg"
    },
    {
      id: 2,
      name: "Royal Silk Saree",
      price: 3000,
      category: "Silk",
      image: "https://tse3.mm.bing.net/th?id=OIP.mDA7kRlcSIZmndyuKHw-VgHaDw&pid=Api&P=0&h=180"
    },
    {
      id: 3,
      name: "Chic Linen Saree",
      price: 2000,
      category: "Linen",
      image: "http://www.koskii.com/cdn/shop/collections/collection-silk-saree.jpg?v=1673258356"
    },
    {
      id: 4,
      name: "Designer Cotton Saree",
      price: 1800,
      category: "Cotton",
      image: "https://singaarglobal.com/wp-content/uploads/2023/04/sarees-folded.jpg"
    },
    {
      id: 5,
      name: "Luxury Silk Saree",
      price: 3500,
      category: "Silk",
      image: "https://5.imimg.com/data5/ANDROID/Default/2021/6/QM/XM/TF/71772596/product-jpeg-500x500.jpg"
    }
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
       //localStorage.setItem('user', JSON.stringify({ username, password }));
      //document.getElementById("signup-msg").textContent = "Account created!";
      const user = { username: password}; // In real apps, hash password!
     localStorage.setItem("userProfile", JSON.stringify(user));
      alert("Registration successful! ");
      const save=document.getElementById("show");
    save.innerHTML=`
    <button onclick="showSection('login')">login</button>
    `;
    }
     else {
      document.getElementById("signup-msg").textContent = "Please enter all fields.";
     }
   }

function login() {
  //const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const stored = localStorage.getItem("userProfile");
  if (!stored) {
    alert("No user found. Please register first.");
    return;
  }

  const user = JSON.parse(stored);
  if (user.username=== password) {
    localStorage.setItem("loggedIn", "true");
    //window.location.href = "";
    const store=document.getElementById("display");
    store.innerHTML=`
    <button onclick="showSection('shop')">Shop Sarees</button>
    `;
  }
  else {
    alert("Invalid password.");
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
        <img src="${p.image}" alt="${p.name}">
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
      li.textContent = `${item.name} - ₹${item.price} `;
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