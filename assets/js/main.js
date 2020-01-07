// Useful elements
var row = document.querySelector('.row'),
// Form elements
    res_name = document.getElementById('res-name'),
    number = document.getElementById('number'),
    email = document.getElementById('email'),
    num_guests = document.getElementById('num-guests'),
    day = document.getElementById('date'),
    time = document.getElementById('time');


var handleScroll = (function() {
  // Calculate number of boxes that can fit in a window
  let windowWidth = document.body.scrollWidth,
      boxWidth    = row.firstElementChild.scrollWidth,
      numBoxes    = Math.ceil(windowWidth / boxWidth);

  // Creates a copy of first element and appends it
  let replicaFirst, replicaLast;
  for(let i=0; i<numBoxes && i<row.children.length; i++) {
    replicaLast = row.children[i].cloneNode(true);
    row.appendChild(replicaLast);
  }
  replicaFirst = row.children[(row.children.length - numBoxes)];
  // Loops
  return function() {
    if(replicaFirst.getBoundingClientRect().left < 0) {
      // reset when scrolling right
      row.scrollLeft = 0;
    } else if(row.scrollLeft === 0) {
      // reset when scrolling left
      row.scrollLeft = replicaFirst.getBoundingClientRect().left;
    }
  }
})();

function submit(e) {
  e.preventDefault();

  // Create date instance from data
  let message = document.getElementById("reserve-error") || document.createElement('div');
  message.id = "reserve-error";

  if(formIsValid(message)){


    message.innerHTML = "Reservation made! We will contact you to confirm.";
    message.style.color = "green";
  }

  // Display message
  let body = document.querySelector('.body');
  body.insertBefore(message, body.querySelector('.reservation'));
};

// Checks if the input fields are correct and adds an error message
function formIsValid(message) {
  let date = new Date(day.value + " " + time.value);

  // Validate number of guests
  if(num_guests.value <= 0) {
    message.innerHTML = "Please give us the number of guests.";
    message.style.color = "red";
    num_guests.style['border-color'] = "red";
    return false;
  } else {
    num_guests.style['border-color'] = "black";
  }
  
  // Validate date
  if(date < Date.now()) {
    message.innerHTML = "Please provide a date in the future, we cannot time travel... yet";
    message.style.color = "red";
    day.style['border-color'] = "red";
    return false;
  } else {
    day.style['border-color'] = "black";
  }
  
  // Validate time
  if(date.getHours() < 18 || date.getHours() > 21) {
    message.innerHTML = "We only take reservations from 6PM to 9PM";
    message.style.color = "red";
    time.style['border-color'] = "red";
    return false;
  } else {
    time.style['border-color'] = "black";
  }
  
  // Validate reservation name
  if(res_name.value.length <= 0) {
    message.innerHTML = "Please enter a name for the reservation.";
    message.style.color = "red";
    res_name.style['border-color'] = "red";
    return false;
  } else {
    res_name.style['border-color'] = "black";
  }
  
  // Validate number of people
  if(!number.value && !email.value) {
    message.innerHTML = "Please give an email or phone number to confirm your reservation.";
    message.style.color = "red";
    number.style['border-color'] = "red";
    email.style['border-color'] = "red";
    return false;
  } else {
    number.style['border-color'] = "black";
    email.style['border-color'] = "red";
  }

  return true;
}

window.onload = function() {
  // Adds infinite scrolling functionality
  row.addEventListener('scroll', handleScroll);
  
  // Handle form submit
  let form = document.querySelector('form');
  form.addEventListener('submit', submit);

  // Starts the carousel after a few idle seconds.
  // setTimeout(() => {
  //   console.log("Starting carousel");
  //   let boxWidth = row.firstElementChild.scrollWidth,
  //       lastPos = row.scrollLeft;
  //   setInterval(() => {
  //     lastPos = (lastPos + boxWidth) % document.body.scrollWidth; // Scrolls a box width position.
  //     row.scroll({
  //       top: 0,
  //       left: lastPos,
  //       behaviour: 'smooth'
  //     });
  //   }, 1000)
  // }, 1000);

};

