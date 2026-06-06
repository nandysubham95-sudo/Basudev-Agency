// Firebase Configuration (Mock - Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "mock-api-key",
    authDomain: "basudev-agency.firebaseapp.com",
    projectId: "basudev-agency",
    storageBucket: "basudev-agency.appspot.com",
    messagingSenderId: "mock-id",
    appId: "mock-app-id"
};

// Mock Database
const mockUsers = new Map();
const mockOrders = [];
const OWNER_EMAIL = 'subhamnandy27@gmail.com';

const products = [
    { id: 1, name: 'Coca Cola', emoji: '🥤', price: 40, description: 'Refreshing Cola' },
    { id: 2, name: 'Sprite', emoji: '🥤', price: 40, description: 'Lemon Lime Soda' },
    { id: 3, name: 'Fanta Orange', emoji: '🥤', price: 40, description: 'Orange Drink' },
    { id: 4, name: 'Iced Tea', emoji: '☕', price: 50, description: 'Cold Tea' },
    { id: 5, name: 'Pepsi', emoji: '🥤', price: 40, description: 'Refreshing Pepsi' },
    { id: 6, name: 'Lemonade', emoji: '🍋', price: 30, description: 'Fresh Lemonade' },
    { id: 7, name: 'Chips', emoji: '🍟', price: 20, description: 'Crunchy Chips' },
    { id: 8, name: 'Snacks Mix', emoji: '🥒', price: 60, description: 'Mixed Snacks' }
];

// State Management
let currentUser = null;
let cart = [];
let isOwnerMode = false;

// DOM Elements
const app = document.getElementById('app');

// Pages
function renderHome() {
    app.innerHTML = `
        <div class="home-page">
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            <div class="ice-cube"></div>
            
            <div class="home-content">
                <div class="logo-animation">🥶</div>
                <h1>Basudev Agency</h1>
                <p>Premium Cold Drinks & Snacks</p>
                
                <div class="button-group">
                    <button class="btn btn-primary" onclick="goToAuth(false)">User Login</button>
                    <button class="btn btn-secondary" onclick="goToAuth(true)">Owner Login</button>
                </div>
            </div>
        </div>
    `;
}

function goToAuth(isOwner) {
    isOwnerMode = isOwner;
    renderSignUp();
}

function renderSignUp() {
    const title = isOwnerMode ? 'Owner Sign Up / Login' : 'User Sign Up / Login';
    app.innerHTML = `
        <div class="auth-page">
            <div class="auth-container">
                <h2>${title}</h2>
                
                <div id="signUpForm">
                    <button class="gmail-btn" onclick="handleGmailSignUp()">Sign up with Gmail</button>
                    <p style="text-align: center; margin: 20px 0; color: #999;">OR</p>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" placeholder="Enter your email">
                    </div>
                    <button class="btn-form" onclick="handleSignUp()">Create Account</button>
                    <div class="toggle-auth">
                        Already have an account? <a onclick="renderLogin()">Login here</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderLogin() {
    app.innerHTML = `
        <div class="auth-page">
            <div class="auth-container">
                <h2>${isOwnerMode ? 'Owner Login' : 'User Login'}</h2>
                
                <div id="loginForm">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="loginEmail" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="loginPassword" placeholder="Enter your password">
                    </div>
                    <button class="btn-form" onclick="handleLogin()">Login</button>
                    <div class="toggle-auth">
                        Don't have an account? <a onclick="renderSignUp()">Sign up here</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleGmailSignUp() {
    alert('Gmail sign-up integration. For demo, please use email signup.');
    const email = prompt('Enter your Gmail address:');
    if (email) {
        document.getElementById('email').value = email;
    }
}

function handleSignUp() {
    const email = document.getElementById('email').value.trim();
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email');
        return;
    }
    
    if (mockUsers.has(email)) {
        alert('Email already registered! Please login.');
        return;
    }
    
    // Ask for password
    const password = prompt('Create a password:');
    if (!password || password.length < 4) {
        alert('Password must be at least 4 characters');
        return;
    }
    
    // Save user
    mockUsers.set(email, { password, email, isOwner: isOwnerMode });
    alert('Account created successfully! Please login.');
    renderLogin();
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    const user = mockUsers.get(email);
    
    if (!user || user.password !== password) {
        alert('Invalid email or password');
        return;
    }
    
    currentUser = { email, isOwner: user.isOwner };
    
    if (email === OWNER_EMAIL) {
        renderOwnerDashboard();
    } else {
        renderUserDashboard();
    }
}

function renderUserDashboard() {
    app.innerHTML = `
        <div class="dashboard-page">
            <div class="navbar">
                <h1>🥶 Basudev Agency</h1>
                <div class="navbar-right">
                    <div class="user-email">${currentUser.email}</div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
            </div>
            
            <div class="products-container">
                ${products.map(product => `
                    <div class="product-card">
                        <div class="product-image">${product.emoji}</div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price">₹${product.price}</div>
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">−</button>
                                <input type="number" class="quantity-input" id="qty-${product.id}" value="0" min="0">
                                <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                            </div>
                            <button class="btn-add-cart" onclick="addToCart(${product.id})">Order Now</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function updateQuantity(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    let value = parseInt(input.value) || 0;
    value = Math.max(0, value + delta);
    input.value = value;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const input = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(input.value) || 0;
    
    if (quantity <= 0) {
        alert('Please select a quantity');
        return;
    }
    
    const order = {
        id: Date.now(),
        customer: currentUser.email,
        items: [
            {
                name: product.name,
                quantity: quantity,
                price: product.price,
                total: product.price * quantity
            }
        ],
        totalAmount: product.price * quantity,
        timestamp: new Date().toLocaleString(),
        status: 'Pending'
    };
    
    mockOrders.push(order);
    alert(`Order placed! ${quantity} x ${product.name}\nTotal: ₹${order.totalAmount}\nOwner will receive your order.`);
    
    input.value = 0;
}

function renderOwnerDashboard() {
    const orders = mockOrders;
    
    app.innerHTML = `
        <div class="owner-dashboard">
            <div class="owner-navbar">
                <h1>📊 Owner Dashboard</h1>
                <div class="navbar-right">
                    <div class="user-email">${currentUser.email}</div>
                    <button class="btn-logout" onclick="logout()">Logout</button>
                </div>
            </div>
            
            <div class="orders-container">
                <h2>Incoming Orders</h2>
                ${orders.length === 0 ? `
                    <div class="empty-state">
                        <h3>No orders yet</h3>
                        <p>Orders from customers will appear here</p>
                    </div>
                ` : `
                    ${orders.map(order => `
                        <div class="order-card">
                            <div class="order-header">
                                <div>
                                    <h3>Order from ${order.customer}</h3>
                                    <div class="order-time">${order.timestamp}</div>
                                </div>
                                <div class="order-status">${order.status}</div>
                            </div>
                            
                            <div class="order-items">
                                ${order.items.map(item => `
                                    <div class="order-item">
                                        <span>${item.quantity}x ${item.name} @ ₹${item.price}</span>
                                        <span>₹${item.total}</span>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="order-total">
                                <span>Total Amount:</span>
                                <span>₹${order.totalAmount}</span>
                            </div>
                        </div>
                    `).join('')}
                `}
            </div>
        </div>
    `;
}

function logout() {
    currentUser = null;
    isOwnerMode = false;
    cart = [];
    renderHome();
}

// Initialize App
renderHome();