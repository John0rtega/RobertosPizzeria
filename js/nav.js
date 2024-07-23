function resetCustomState() {
  // Reset state of size buttons
  document.querySelectorAll('.size-button').forEach((button) => {
    button.classList.remove('selected');
  });

  // Update price list element
  const priceListElement = document.querySelector('.price-list');
  if (priceListElement) {
    priceListElement.textContent = 'Select a size';
  }
}

function resetSidebarSelection() {
  // Remove 'active' class from sidebar items
  document.querySelectorAll('#sidebar .nav-link').forEach((link) => {
    link.classList.remove('active');
  });
}

function resetPage() {
  // Clear URL parameters
  if (window.history.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Clear local storage and session storage
  localStorage.clear();
  sessionStorage.clear();

  // Reset form inputs
  document.querySelectorAll('input, textarea, select').forEach((element) => {
    element.value = '';
  });

  // Reset custom state
  resetCustomState();

  // Reset sidebar selection
  resetSidebarSelection();

  // Set the active link based on hash (if any)
  setActiveLinkFromHash();

  // Scroll to the top of the page after content is loaded
  window.scrollTo(0, 0);
}

// Function to set active link based on the URL hash
function setActiveLinkFromHash() {
  const hash = window.location.hash;
  const sidebar = document.getElementById('sidebar');

  document.querySelectorAll('#sidebar .nav-link').forEach((link) => {
    // Toggle 'active' class based on the URL hash
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

// Call the resetPage function on page load
window.addEventListener('load', resetPage);

// Call the function when the hash changes
window.addEventListener('hashchange', setActiveLinkFromHash);
