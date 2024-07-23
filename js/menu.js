document.addEventListener('DOMContentLoaded', function () {
  const menuSections = [
    { id: 'apps', title: 'Appetizers' },
    { id: 'pizzas', title: 'Pizzas' },
    { id: 'hot-sandwiches', title: 'Hot Sandwiches' },
    { id: 'cold-sandwiches', title: 'Cold Sandwiches' },
    { id: 'grill', title: 'From The Grill' },
    { id: 'wings', title: 'Wings' },
    { id: 'wraps', title: 'Wraps' },
    { id: 'pastas', title: 'Pastas' },
    { id: 'salads', title: 'Salads' },
  ];

  const menuContent = document.getElementById('menu-content');

  menuSections.forEach((section) => {
    const sectionElement = document.createElement('section');
    sectionElement.id = section.id;

    let titleContent;
    if (
      section.title === 'HOT SANDWICHES' ||
      section.title === 'COLD SANDWICHES'
    ) {
      const [firstWord, secondWord] = section.title.split(' ');
      titleContent = `
        <div class="wrapper two-word">
          <span class="first-word" data-text="${firstWord}">${firstWord}</span>
          <span class="second-word" data-text="${secondWord}">${secondWord}</span>
        </div>`;
    } else {
      titleContent = `
        <div class="wrapper one-word">
          <div class="top">${section.title}</div>
          <div class="bottom" aria-hidden="true">${section.title}</div>
        </div>`;
    }

    sectionElement.innerHTML = `
      <h2>${titleContent}</h2>
      <div class="row"></div>
    `;
    menuContent.appendChild(sectionElement);

    // Load the menu items for the current section
    loadMenu(section.id);
  });
});

function loadMenu(menu) {
  fetch(`items/${menu}.json`)
    .then((response) => response.json())
    .then((data) => renderMenu(menu, data))
    .catch((error) => console.error('Error loading menu:', error));
}

function renderMenu(menu, items) {
  const section = document.querySelector(`#${menu} .row`);
  section.innerHTML = ''; // Clear previous items

  items.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4'; // Ensure this aligns with CSS flex rules

    // Check if sizes property exists and is an object
    const sizes =
      item.sizes && typeof item.sizes === 'object' ? item.sizes : {};
    const sizeButtons = Object.keys(sizes)
      .map(
        (size, index) => `
      <button class="size-button" data-price="${sizes[size]}">${size}</button>
    `
      )
      .join('');

    col.innerHTML = `
      <div class="card">
        <div class="content">
          <div class="card-title">${item.name}</div>
          ${
            item.ingredients
              ? `<p class="card-text">${item.ingredients}</p>`
              : ''
          }
          <div class="size-info">
            <p class="size-text">Select a size:</p>
            <div class="size-buttons">${sizeButtons}</div>
          </div>
          <div class="price-display">
            <p class="price-list">
              ${Object.values(sizes)[0] || 'Select a size'}
            </p>
          </div>
        </div>
      </div>
    `;

    section.appendChild(col);

    // Set the first button as selected by default
    const buttons = col.querySelectorAll('.size-button');
    if (buttons.length > 0) {
      buttons[0].classList.add('selected');
      col.querySelector('.price-list').textContent =
        buttons[0].getAttribute('data-price');
    }

    // Add event listeners for size buttons
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const price = button.getAttribute('data-price');
        col.querySelector('.price-list').textContent = price;
        buttons.forEach((btn) => btn.classList.remove('selected')); // Remove selected class from all buttons
        button.classList.add('selected'); // Add selected class to the clicked button
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollDownButton = document.getElementById('scroll-down');
  const menuSection = document.getElementById('sidebar');

  scrollDownButton.addEventListener('click', () => {
    window.scrollTo({
      top: menuSection.offsetTop,
      behavior: 'smooth',
    });
  });
});
