let submitButton = document.querySelector("button");
let tags = document.querySelectorAll(".tag");
const trashBtn = document.querySelectorAll(".fa");

//Menu links
let links = document.querySelectorAll(".links a");
//Body id of current page
let bodyId = document.querySelector("body").id;
//Nav active link
for (let i = 0; i < links.length; i++) {
  if (links[i].dataset.active === bodyId) {
    links[i].classList.add("active");
  }
}
//Delete functionality
trashBtn.forEach((item) => {
  item.addEventListener("click", async (e) => {
    let cardName =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;
    console.log(e.target.parentElement);
    const endPoint = `/delete/${cardName}`;
    let displayCard = e.target.parentElement;
    await fetch(endPoint, {
      method: "post",
    });
    displayCard.remove();
  });
});

//If pathname contains the innerText of the currently clicked tag button, add the active class to the tag.
window.onload = () => {
  tags.forEach((item) => {
      let pathname = document.location.pathname.split("/")[2];
      if(decodeURI(pathname) === item.innerText) {
        item.classList.add('true')
      } else if(!pathname) {
        tags[0].classList.add('true')
      }
      //
  });
}
