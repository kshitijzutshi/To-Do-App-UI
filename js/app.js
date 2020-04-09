// select the elements

const clear = document.querySelector(".clear");
const dateElement = document.querySelector(".date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from local storage to prevent disappearence on page refresh
let data = localStorage.getItem("TODO");
// Check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to last one in the list
  loadlist(LIST); // function to load the list to user interface
} else {
  LIST = [];
  id = 0;
}

function loadlist(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// add item to local storage -> this code must be added where ever list is updated!!
// localStorage.setItem("TODO", JSON.stringify(LIST));

// REFRESH BUTTON TO CLEAR ALL

// show today's date

const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
// console.log(today.toLocaleDateString("en-US", options));
// dateElement.innerHTML = "";
// console.log(dateElement);
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to-do function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
<p class="text ${LINE}">${toDo}</p>
<i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
</li>
`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add item when enter is pressed

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // AS LIST IS UPDATED HERE
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    // after enter clear input box
    input.value = "";
  }
});

// Function for when user clicks done circle

function completeToDo(element) {
  // If its checked make uncheck and vice versa. Text line through can be accessed by first selecting parent node then child node

  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// To delete the note

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// In the list we need to have an event listener to know whether a check was performed or delete was performed, hence changing job type

list.addEventListener("click", function (event) {
  // event.target gives us the click element inside list
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //AS LIST IS UPDATED HERE
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
