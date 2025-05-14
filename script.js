//RESPONSIVE NAVBAR
const hamburger = document.getElementById('hamburger');
const navLinks =  document.getElementById('nav-links');

hamburger.addEventListener('click', ()=> {
    navLinks.classList.toggle('show');
});

//BACK TO TOP BUTTON
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//CODE FOR FLITRATION
  const buttons = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');

      // Update active button
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/hide products
      products.forEach(product => {
        if (category === 'all') {
          product.classList.remove('hidden');
        } else {
          const match = product.classList.contains(`category-${category}`);
          product.classList.toggle('hidden', !match);
        }
      });
    });
  });





/*Simple cart array to hold items
let cart = [];

// Get the button and cart count display
const addCartBtn = document.querySelector('.addCart');
const cartCount = document.getElementById('cart-count');

// Listen for button click
addCartBtn.addEventListener('click', function() {
    // Example item object
    const item = {
        name: 'Snickers',
        price: 700,
        img: './img/img1.png'
    };
    cart.push(item);

    // Update cart count
    cartCount.textContent = 'Cart: ' + cart.length;
});*/





/*
// Helper to get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Helper to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count display
function updateCartCount() {
    const cart = getCart();
    document.getElementById('cart-count').textContent = 'Cart: ' + cart.length;
}

// Add to cart logic
document.querySelectorAll('.addCart').forEach(btn => {
    btn.addEventListener('click', function() {
        const itemDiv = btn.closest('.item');
        const item = {
            name: itemDiv.getAttribute('data-name'),
            price: itemDiv.getAttribute('data-price'),
            img: itemDiv.getAttribute('data-img')
        };
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        updateCartCount();
    });
});

// Show cart modal
document.getElementById('show-cart').addEventListener('click', function() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.textContent = 'Cart is empty.';
    } else {
        cart.forEach((item, idx) => {
            const div = document.createElement('div');
            div.innerHTML = `<img src="${item.img}" width="30"> ${item.name} - ₦${item.price}`;
            cartItemsDiv.appendChild(div);
        });
    }
    document.getElementById('cart-modal').style.display = 'block';
});

// Close cart modal
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Initialize cart count on page load
updateCartCount();*/















//
function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.textContent = 'Cart is empty.';
        cartTotalDiv.textContent = '';
    } else {
        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="${item.img}" width="30"> 
                ${item.name} - ₦${item.price} x <span class="qty">${item.qty}</span> = <strong>₦${itemTotal}</strong>
                <button class="qty-btn" data-idx="${idx}" data-action="decrease">-</button>
                <button class="qty-btn" data-idx="${idx}" data-action="increase">+</button>
                <button class="remove-btn" data-idx="${idx}">Remove</button>
            `;
            cartItemsDiv.appendChild(div);
        });
        cartTotalDiv.innerHTML = `<strong>Total: ₦${total}</strong>`;
    }
}

//







function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    // Sum all quantities
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = 'Cart: ' + totalQty;
}

function addToCart(item) {
    let cart = getCart();
    // Check if item already exists
    const idx = cart.findIndex(i => i.name === item.name);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        item.qty = 1;
        cart.push(item);
    }
    saveCart(cart);
    updateCartCount();
}

document.querySelectorAll('.addCart').forEach(btn => {
    btn.addEventListener('click', function() {
        const itemDiv = btn.closest('.item');
        const item = {
            name: itemDiv.getAttribute('data-name'),
            price: parseInt(itemDiv.getAttribute('data-price')),
            img: itemDiv.getAttribute('data-img')
        };
        addToCart(item);
    });
});

function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.textContent = 'Cart is empty.';
    } else {
        cart.forEach((item, idx) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="${item.img}" width="30"> 
                ${item.name} - ₦${item.price} 
                <button class="qty-btn" data-idx="${idx}" data-action="decrease">-</button>
                <span class="qty">${item.qty}</span>
                <button class="qty-btn" data-idx="${idx}" data-action="increase">+</button>
                <button class="remove-btn" data-idx="${idx}">Remove</button>
            `;
            cartItemsDiv.appendChild(div);
        });
    }
}

document.getElementById('show-cart').addEventListener('click', function() {
    renderCart();
    document.getElementById('cart-modal').style.display = 'block';
});

document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Delegate events for quantity and remove buttons
document.getElementById('cart-items').addEventListener('click', function(e) {
    const cart = getCart();
    if (e.target.classList.contains('remove-btn')) {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        cart.splice(idx, 1);
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
    if (e.target.classList.contains('qty-btn')) {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        const action = e.target.getAttribute('data-action');
        if (action === 'increase') {
            cart[idx].qty += 1;
        } else if (action === 'decrease' && cart[idx].qty > 1) {
            cart[idx].qty -= 1;
        }
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
});

// Initialize cart count on page load
updateCartCount();


//Checkout button logic
document.getElementById('checkout-btn').addEventListener('click', function() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    alert(`Thank you for your purchase! Your total is ₦${total}.`);
    // Optionally, clear the cart after checkout:
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
});







// JAVASCRIPT TO HIDE AND SHOW ALERT
function showCustomAlert(message) {
    document.getElementById('custom-alert-message').textContent = message;
    document.getElementById('custom-alert').style.display = 'flex';
}

document.getElementById('custom-alert-close').addEventListener('click', function() {
    document.getElementById('custom-alert').style.display = 'none';
});


//POP UP FOR NEW CART
function showCartPopup(message = "Added to cart!") {
    const popup = document.getElementById('cart-popup');
    popup.textContent = message;
    popup.classList.add('show');
    popup.style.display = 'block';
  
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 400); // match the transition duration
    }, 3000); // show for 2 seconds
  }
  showCartPopup("Your item was added to the cart!");