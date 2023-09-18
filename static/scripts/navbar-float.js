const navToggler = document.getElementById("navbar-float-toggler");
const navbarLinkList = document.getElementById("navbar-float-linklist");

navToggler.addEventListener("click", () => {
  console.log("right");
  navbarLinkList.classList.toggle("navbar-float-linklist-active");
})