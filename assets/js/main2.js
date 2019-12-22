// Useful elements
var row = document.querySelector('.row');

window.onload = function() {
  
  // Scroll Handler
  // let handleScrollDebounced = debounce(handleScroll(), 700);
  // row.addEventListener('scroll', handleScrollDebounced);
  row.addEventListener('scroll', handleScroll);
};

var handleScroll = (function() {
  // Calculate number of boxes that can fit in a window
  let windowWidth = document.body.scrollWidth,
      boxWidth    = row.firstElementChild.scrollWidth,
      numBoxes    = Math.ceil(windowWidth / boxWidth);
  console.log("numBoxes: ", numBoxes);

  // Creates a copy of first element and appends it
  let replicaFirst, replicaLast;
  for(let i=0; i<numBoxes && i<row.children.length; i++) {
    replicaLast = row.children[i].cloneNode(true);
    row.appendChild(replicaLast);
  }
  replicaFirst = row.children[(row.children.length - numBoxes)];
  // Loops
  return function() {
    console.log(replicaFirst.getBoundingClientRect().left);
    if(replicaFirst.getBoundingClientRect().left < 0) {
      // reset when scrolling right
      row.scrollLeft = 0;
    } else if(row.scrollLeft === 0) {
      // reset when scrolling left
      row.scrollLeft = replicaFirst.getBoundingClientRect().left;
    }
  }
})();

// Returns the direction that an element was last scrolled
var getScrollDirection = function(elem) {
  let lastScroll = 0;
  return function() {
    let isScrollingLeft = elem.scrollLeft < lastScroll;
    lastScroll = elem.scrollLeft;
    return isScrollingLeft;
  };
}

// Note: Might want throttling for the scroll effect
function debounce(func, time) {
  let called = false;
  let context, args;
  return function() {
    context = this;
    args = Array.from(arguments);
    if(!called) {
      called = true;
      setTimeout(() => {
        called = false;
        func.bind(context)(...args);
      }, time);
    }
  }
}