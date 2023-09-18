const seeMoreLinkList = document.querySelectorAll('.organize-container .see-more');

seeMoreLinkList.forEach((element) => {
  const id = element.id;
  if (id) {
    const sponsorId = id.slice(0, -14);
    const popupContainer = document.getElementById(sponsorId + "-popup-container");
    element.addEventListener('click',  function(event) {
      event.preventDefault();
      popupContainer.style.display = "flex";
    });
  }
})

const seeMoreContainerList = document.querySelectorAll('.diamand-popup-container');

seeMoreContainerList.forEach((element) => {
  element.addEventListener("click", function(event) {
    if (event.target.id !== element.id) {
      return;
    }
    element.style.display = "none";
  });
})
