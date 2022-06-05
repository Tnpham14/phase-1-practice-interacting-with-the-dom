
//* A Counter that increases by 1 each second
//* Plus and Minus buttons that increment or decrement the counter
//* A 'like' button (❤️) that adds a 'like' for the number that is currently displayed by the timer
//* A comment box that adds comments when submitted
//1. As a user, I should see //the timer increment every //second once the page has //loaded.
//2. As a user, I can manually //increment and decrement the //counter using the plus and //minus buttons.
//3. As a user, I can 'like' an //individual number of the //counter. I should see count //of the number of 'likes' //associated with that number.
//4. As a user, I can pause the //counter, which should 
//
//  * pause the counter
//  * disable all buttons //except the pause button
//  * the pause button should //then show the text "resume."
//
//  When 'resume' is clicked, //it should restart the //counter and re-enable the //buttons.
//5. As a user, I can leave //comments on my gameplay, such //as: "Wow, what a fun game //this is."

/*
## Data
counter(integer)
likeCounter(Object w/keys of numbers & values of how many likes they have) {1: 2, 2: 0, 3: 3}
comments {array of strings}
## Display ( what pieces of html will house are data?)
h1#counter => counter
ul.likes => likesCounter
#list => comments
## Behavior (Events)
DOMContentLoaded => attach Listeners, start counter
click on plus
click on minus
click on heart
click on pause 
click on resume-needs to do something diff. than pause button
submit comment form
##Update Data
incrementCounter()
decrementCounter()
increaseLikes()-needs number when we click on like
pause()
resume()
addComment()
## Display New Data by DOM Manipulation
when we click on plus we call incrementCounter() and update the counter h1 innerText
When we click on minus we call decrementCounter() and update the counter h1 innerText
When we click on the heart we call increaseLikes(number) and update our list of likes (ul.likes)
When we click on pause we call pause(), disable all the buttons (except pause) and relabel the button
as 'resume'
When we click on resume, we call resume(), reenable all the buttons and relabel the button pause 
when we submit the add comment form, we call addComment() and append the comment to divlist
start w/Object Oriented by defining a counter class
*/

const timerH1 = document.querySelector("h1#counter");
const buttonContainer = document.querySelector("#button-container");
const likesUl = document.querySelector("ul.likes");
const commentForm = document.querySelector("#comment-form");
const commentList = document.querySelector("#list");

// Application State (single source of truth)
let currentNumber = 0;
let counterRunning = true;
let likedNumbers = {};
// { 1: 3, 20: 2 }

// Events
commentForm.addEventListener("submit", (event) => {
  // always do this for submits!
  event.preventDefault();

  const p = document.createElement("p");
  const input = document.querySelector("#comment-input");
  // const input = commentForm.comment
  // const input = event.target.comment
  p.textContent = input.value;
  commentList.append(p);

  event.target.reset();
  // commentForm.reset()
});

buttonContainer.addEventListener("click", (event) => {
  if (event.target.id === "plus") {
    changeCounter(1);
  } else if (event.target.id === "minus") {
    changeCounter(-1);
  } else if (event.target.id === "pause") {
    togglePaused();
  } else if (event.target.id === "heart") {
    updateLikes();
  }
});

function updateLikes() {
  if (likedNumbers[currentNumber]) {
    const li = document.querySelector(`[data-number="${currentNumber}"]`);
    likedNumbers[currentNumber] += 1;
    li.textContent = `The number ${currentNumber} has been liked ${likedNumbers[currentNumber]} times`;
  } else {
    likedNumbers[currentNumber] = 1;
    const li = document.createElement("li");
    li.dataset.number = currentNumber;
    li.textContent = `The number ${currentNumber} has been liked 1 time`;
    likesUl.append(li);
  }
}

function togglePaused() {
  counterRunning = !counterRunning;
  document.querySelectorAll("button").forEach((button) => {
    if (button.id !== "pause") {
      button.disabled = !counterRunning;
    } else {
      if (counterRunning) {
        button.textContent = "pause";
      } else {
        button.textContent = "resume";
      }
    }
  });
}

function changeCounter(amount) {
  currentNumber = currentNumber + amount;
  timerH1.textContent = currentNumber;
}

// setInterval run code every second
setInterval(() => {
  if (counterRunning) {
    changeCounter(1);
  }
}, 1000);