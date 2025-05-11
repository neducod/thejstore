const hamburger = document.getElementById('hamburger');
const navLinks =  document.getElementById('nav-links');

hamburger.addEventListener('click', ()=> {
    navLinks.classList.toggle('show');
});


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



//ADD TO CART FEATURE
/*let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});
*

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close'); // Corrected selector
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
*/
/*

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
*/


// Simple cart array to hold items
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
});