document.addEventListener('DOMContentLoaded', () => {
  const scrollDownButton = document.getElementById('scroll-down');

  if (scrollDownButton) {
    scrollDownButton.addEventListener('click', () => {
      // Scroll down to the next section (or adjust to your needs)
      window.scrollBy({
        top: window.innerHeight, // Scroll down by one viewport height
        behavior: 'smooth', // Smooth scroll
      });
    });
  }
});
