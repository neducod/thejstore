const hamburger = document.getElementById('hamburger');
const navLinks =  document.getElementById('nav-links');

hamburger.addEventListener('click', ()=> {
    navLinks.classList.toggle('show');
});

/*
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button style
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/hide cards
      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

*/

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





  function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " added to cart!");
  }