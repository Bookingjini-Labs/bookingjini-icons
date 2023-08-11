const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.open(link.href, '_blank');
  });
});

