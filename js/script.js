document.addEventListener("DOMContentLoaded", function() {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarMenu = document.querySelector(".navbar-menu");
  
    navbarToggler.addEventListener("click", function() {
      document.querySelector('.navbar').classList.toggle('open');
    });
  });
  