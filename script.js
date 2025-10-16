// Sample data for fruit hampers (carousel)
const hampers = [
  {
    name: "Classic Fruit Hamper",
    price: "₵120",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Tropical Basket",
    price: "₵150",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Deluxe Celebration",
    price: "₵200",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
  }
];

// Sample data for extra items
const extraItems = [
  {
    name: "Chocolate Bar",
    price: "₵20",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80"
  },
  {
    name: "Greeting Card",
    price: "₵10",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=80&q=80"
  },
  {
    name: "Wine Bottle",
    price: "₵60",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80"
  }
];

let currentSlide = 0;

function renderCarousel() {
  const carousel = document.getElementById('carousel');
  carousel.innerHTML = '';
  const item = hampers[currentSlide];
  const div = document.createElement('div');
  div.className = 'carousel-item';
  div.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <div class="item-info">
      <div class="item-name">${item.name}</div>
      <div class="item-price">${item.price}</div>
    </div>
  `;
  carousel.appendChild(div);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + hampers.length) % hampers.length;
  renderCarousel();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % hampers.length;
  renderCarousel();
}

function renderExtraItems() {
  const itemsList = document.getElementById('items-list');
  itemsList.innerHTML = '';
  extraItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'extra-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-name">${item.name}</div>
      <div class="item-price">${item.price}</div>
    `;
    itemsList.appendChild(div);
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderCarousel();
  renderExtraItems();
});
