// Useful elements
var row = document.querySelector('.row');

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

window.onload = function() {
  row.addEventListener('scroll', handleScroll);

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

