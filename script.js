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