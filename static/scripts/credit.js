const seeMoreLinkList=document.querySelectorAll(".organize-container .see-more");seeMoreLinkList.forEach((e=>{const n=e.id;if(n){const t=n.slice(0,-14),o=document.getElementById(t+"-popup-container");e.addEventListener("click",(function(e){e.preventDefault(),o.style.display="flex"}))}}));const seeMoreContainerList=document.querySelectorAll(".diamand-popup-container");seeMoreContainerList.forEach((e=>{e.addEventListener("click",(function(n){n.target.id===e.id&&(e.style.display="none")}))}));