const board = document.querySelector(".board");
const check = document.querySelector(".check");
const alert = document.querySelector(".alert");
const Pieces = [
  "./0wvq8lmzuljqbh7gl7zy0hm/9.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/8.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/7.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/6.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/5.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/4.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/3.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/2.jpg",
  "./0wvq8lmzuljqbh7gl7zy0hm/1.jpg",
];
var listItems = [];
let startIndex;
let endIndex;
function createList() {
  [...Pieces]
    .map((piece) => ({ value: piece, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((piece) => piece.value)
    .forEach((piece, index) => {
      const div = document.createElement("div");
      div.classList.add("draggable");
      div.draggable = "true";
      div.setAttribute("data-index", index);
      div.innerHTML = `<img src=${piece} draggable="true" alt="" class="drag-img" />`;
      board.appendChild(div);

      listItems.push(div.firstChild);
    });

  addEventListeners();
}
createList();

function dragOver(e) {
  e.preventDefault();
}
function dragStart() {
  startIndex = +this.closest("div").getAttribute("data-index");
}
function swap(fromIndex, toIndex) {
  let itemOne = listItems[fromIndex];

  let itemTwo = listItems[toIndex];
  let temp;
  temp = itemOne.src;
  itemOne.src = itemTwo.src;
  itemTwo.src = temp;
}
// dragDrop
function dragDrop() {
  endIndex = +this.getAttribute("data-index");

  swap(startIndex, endIndex);
}
//  function to swap  places
function dragLeave() {
  this.classList.remove("over");
}
function dragEnter() {
  this.classList.remove("over");
}
// alert function

function Failure(unresolvedAmount) {
  const div = document.createElement("div");
  div.classList = "removeableclass";
  div.innerHTML = ` You have ${unresolvedAmount} unresolved ${
    unresolvedAmount > 1 ? "pieces" : "piece"
  }`;
  alert.classList.add("failure");
  alert.appendChild(div);
}
function Success(numberOfPieces) {
  const div = document.createElement("div");
  // div.parentElement.classList = "alert";
  div.innerHTML = `Congratulation you have fixed all ${numberOfPieces} pieces corectly`;
  alert.classList.add("success");
  alert.appendChild(div);
}
//  function to clear alert
function clearUI() {
  const removeable = document.querySelector(".removeableclass");
  removeable.parentElement.style.padding = "0px";
  removeable.remove();
}
function checkOrder() {
  const unresolved = listItems.filter((listItem, index) => {
    const imgSrc = listItem.src.substr(21);
    const added = "." + imgSrc;
    const draggableSpace = document.querySelectorAll(".draggable");
    const boardSpace = document.querySelector(".board");
    draggableSpace.forEach((draggable) =>
      draggable.classList.toggle("checkSpace")
    );
    boardSpace.classList.toggle("checkSpace");
    if (added === Pieces[index]) {
      return 0;
    }
    return index;
  });
  const numberOfPieces = listItems.length;
  if (unresolved.length > 0) {
    Failure(unresolved.length);
    alert.style.padding = " 0.4rem 0.9rem";
    setTimeout(() => {
      clearUI();
    }, 3000);
  } else {
    Success(numberOfPieces);
    alert.style.padding = " 0.4rem 0.9rem";
    setTimeout(() => {
      clearUI();
    }, 3000);
  }
}
//  function to check for correctness
check.addEventListener("click", checkOrder);
// adding evenlisteners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragover", dragOver);
    draggable.addEventListener("drop", dragDrop);
    draggable.addEventListener("dragleave", dragLeave);
    draggable.addEventListener("dragenter", dragEnter);
  });
}

//
/*
listItems.forEach((listItem, index) => {
  const imgSrc = listItem.src.substr(21);
  const added = "." + imgSrc;
  // const unresolved = [added !== Pieces[index]].map((item) => item);
  const filteredCount = listItems.filter((item) => added !== Pieces[index]);

  if (added !== Pieces[index]) {
    console.log("wrong");
    console.log(`you have ${filteredCount.length}  unresolved`);
  } else {
    console.log("correct");
  }
});
*/
//
