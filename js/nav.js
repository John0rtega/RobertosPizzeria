// Function to set active link based on the URL hash
function setActiveLinkFromHash() {
  const hash = window.location.hash;
  const sidebar = document.getElementById('sidebar');

  document.querySelectorAll('#sidebar .nav-link').forEach((link) => {
    // Toggle 'active' class based on the URL hash
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

// Call the function on page load
window.addEventListener('load', setActiveLinkFromHash);

// Call the function when the hash changes
window.addEventListener('hashchange', setActiveLinkFromHash);
