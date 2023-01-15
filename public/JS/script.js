let submitButton = document.querySelector("button");
let tags = document.querySelectorAll(".tag");
const trashBtn = document.querySelectorAll(".fa");

//Menu links
let links = document.querySelectorAll('.links a')
//Body id of current page
let bodyId = document.querySelector('body').id
//Nav active link
for(let i = 0; i < links.length; i++) {
    if(links[i].dataset.active === bodyId) {
        links[i].classList.add('active')
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
//Highlighted tag functionality
tags.forEach((item) => {
  item.addEventListener("click", async (e) => {
    // item.className.toggle('active')

    
    // let current = document.getElementsByClassName("active")
    // current[0].className = current[0].className.replace(" active");
    // e.target.className +=  " active"
  });
});
