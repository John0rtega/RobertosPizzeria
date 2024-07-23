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
    const sizeBoxes = Object.keys(sizes)
      .map(
        (size) => `
        <div class="size-info">
          <div class="size-box">${size}</div>
          <div class="price-display">${sizes[size]}</div>
        </div>
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
              : '<div class="card-text"></div>'
          }
          <div class="sizes-container">
            ${sizeBoxes}
          </div>
        </div>
      </div>
    `;

    section.appendChild(col);
  });
}
